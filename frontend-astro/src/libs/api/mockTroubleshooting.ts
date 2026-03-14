import type { Troubleshooting } from "../../types/types";

export const mockPosts: Troubleshooting[] = [
  {
    id: 1,
    title: "Docker Compose 환경에서 PostgreSQL 연결 실패",
    content: `
<p>Docker Compose로 Next.js + PostgreSQL을 띄웠는데, 앱 컨테이너에서 DB 연결이 계속 실패했다.</p>

<p>에러 메시지:</p>

<pre><code>Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 5432
}</code></pre>

<h3>원인</h3>
<p><code>DATABASE_URL</code>에 <code>localhost</code>를 쓰고 있었는데, 컨테이너 간 통신에서는 <strong>서비스 이름</strong>을 호스트로 써야 한다.</p>

<h3>해결</h3>
<pre><code># .env (before)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# .env (after) — 서비스 이름 "db"로 변경
DATABASE_URL=postgresql://user:pass@db:5432/mydb</code></pre>

<p>docker-compose.yml에서 PostgreSQL 서비스 이름이 <code>db</code>였기 때문에, 이걸 호스트로 지정하면 정상 연결된다.</p>
    `.trim(),
    image_url: "",
    tags: ["Docker", "PostgreSQL", "DevOps"],
    createdAt: "2025-04-12T09:00:00Z",
    language: "ko",
    translatedTitle: "PostgreSQL Connection Failure in Docker Compose",
    translatedContent: `
<p>I set up Next.js + PostgreSQL with Docker Compose, but the app container kept failing to connect to the database.</p>

<p>Error message:</p>

<pre><code>Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect'
}</code></pre>

<h3>Cause</h3>
<p>I was using <code>localhost</code> in <code>DATABASE_URL</code>, but inter-container communication requires the <strong>service name</strong> as host.</p>

<h3>Solution</h3>
<pre><code># .env (before)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# .env (after) — use service name "db"
DATABASE_URL=postgresql://user:pass@db:5432/mydb</code></pre>

<p>Since the PostgreSQL service was named <code>db</code> in docker-compose.yml, using it as the host resolved the connection issue.</p>
    `.trim(),
  },
  {
    id: 2,
    title: "Next.js Hydration Mismatch with useEffect",
    content: `
<p>A hydration error kept appearing in the console after deploying a Next.js page that used <code>window.innerWidth</code> inside the render body.</p>

<pre><code>Warning: Text content did not match.
Server: "desktop" Client: "mobile"

Uncaught Error: Hydration failed because the initial UI
does not match what was rendered on the server.</code></pre>

<h3>Cause</h3>
<p>Server-side rendering doesn't have access to <code>window</code>, so the server rendered "desktop" while the client rendered "mobile". React strict mode flagged this as a hydration mismatch.</p>

<h3>Solution</h3>
<p>Move browser-only logic into <code>useEffect</code> and use a loading state:</p>

<pre><code>const [isMobile, setIsMobile] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  setIsMobile(window.innerWidth < 768);
}, []);

if (!mounted) return null; // or a skeleton</code></pre>

<p>This ensures the server and client initial render match, and the real value is applied only after mount.</p>
    `.trim(),
    image_url: "",
    tags: ["Next.js", "React", "SSR"],
    createdAt: "2025-03-20T14:30:00Z",
    language: "en",
    translatedTitle: "Next.js useEffect 하이드레이션 불일치 문제",
    translatedContent: `
<p>Next.js 페이지에서 렌더 본문에 <code>window.innerWidth</code>를 사용한 후 배포했더니 콘솔에 하이드레이션 에러가 계속 발생했습니다.</p>

<pre><code>Warning: Text content did not match.
Server: "desktop" Client: "mobile"

Uncaught Error: Hydration failed because the initial UI
does not match what was rendered on the server.</code></pre>

<h3>원인</h3>
<p>서버사이드 렌더링에서는 <code>window</code>에 접근할 수 없어서 서버는 "desktop"을, 클라이언트는 "mobile"을 렌더링했습니다.</p>

<h3>해결</h3>
<p>브라우저 전용 로직을 <code>useEffect</code> 안으로 옮기고 로딩 상태를 사용합니다:</p>

<pre><code>const [isMobile, setIsMobile] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  setIsMobile(window.innerWidth < 768);
}, []);

if (!mounted) return null;</code></pre>

<p>이렇게 하면 서버와 클라이언트의 초기 렌더가 일치하고, 실제 값은 마운트 후에만 적용됩니다.</p>
    `.trim(),
  },
  {
    id: 3,
    title: "Tailwind CSS 클래스가 프로덕션 빌드에서 사라지는 문제",
    content: `
<p>개발 환경에서는 잘 보이던 스타일이 <code>npm run build</code> 후 프로덕션에서 사라졌다.</p>

<pre><code>// 동적으로 클래스를 생성하던 코드
const color = isActive ? "blue" : "gray";
return &lt;div className={\`bg-\${color}-500 text-white\`}&gt;...&lt;/div&gt;</code></pre>

<h3>원인</h3>
<p>Tailwind은 빌드 타임에 정적 분석으로 사용된 클래스를 추출합니다. <code>bg-\${color}-500</code>처럼 동적으로 조합된 문자열은 감지하지 못해 purge 됩니다.</p>

<h3>해결</h3>
<p>완전한 클래스 문자열을 사용해야 합니다:</p>

<pre><code>// ✅ 올바른 방법
const className = isActive ? "bg-blue-500" : "bg-gray-500";
return &lt;div className={\`\${className} text-white\`}&gt;...&lt;/div&gt;</code></pre>

<p>또는 <code>safelist</code>에 등록:</p>

<pre><code>// tailwind.config.js
module.exports = {
  safelist: [
    'bg-blue-500',
    'bg-gray-500',
  ],
}</code></pre>
    `.trim(),
    image_url: "",
    tags: ["Tailwind CSS", "Next.js", "CSS"],
    createdAt: "2025-05-01T11:15:00Z",
    language: "ko",
    translatedTitle: "Tailwind CSS Classes Disappearing in Production Build",
    translatedContent: `
<p>Styles that looked fine in development disappeared after <code>npm run build</code> in production.</p>

<pre><code>// Code that dynamically generated classes
const color = isActive ? "blue" : "gray";
return &lt;div className={\`bg-\${color}-500 text-white\`}&gt;...&lt;/div&gt;</code></pre>

<h3>Cause</h3>
<p>Tailwind extracts used classes via static analysis at build time. Dynamically composed strings like <code>bg-\${color}-500</code> cannot be detected and get purged.</p>

<h3>Solution</h3>
<p>Use complete class name strings:</p>

<pre><code>// ✅ Correct
const className = isActive ? "bg-blue-500" : "bg-gray-500";
return &lt;div className={\`\${className} text-white\`}&gt;...&lt;/div&gt;</code></pre>
    `.trim(),
  },
  {
    id: 4,
    title: "React Native Expo 빌드 시 EAS Build 타임아웃",
    content: `
<p>Expo로 React Native 앱을 빌드할 때 EAS Build가 15분 넘게 걸리다가 타임아웃으로 실패했다.</p>

<pre><code>[BUILD_FAILED] Build timed out after 900 seconds
Error: Gradle build daemon disappeared unexpectedly
  (it may have been killed or may have crashed)</code></pre>

<h3>원인</h3>
<p>프리 티어 EAS 빌드 서버의 메모리 제한(4GB)을 초과하는 큰 네이티브 모듈들이 있었다. 특히 <code>react-native-reanimated</code>와 <code>lottie-react-native</code>가 동시에 컴파일되면서 메모리를 많이 소모했다.</p>

<h3>해결</h3>

<pre><code>// eas.json — 메모리 설정 추가
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "env": {
          "GRADLE_OPTS": "-Xmx4096m -Dorg.gradle.jvmargs=-Xmx4096m"
        }
      }
    }
  }
}</code></pre>

<p>추가로 불필요한 네이티브 모듈을 제거하고, <code>npx expo-doctor</code>로 의존성 충돌을 정리했더니 빌드 시간이 8분으로 줄었다.</p>
    `.trim(),
    image_url: "",
    tags: ["React Native", "Expo", "DevOps"],
    createdAt: "2025-06-15T08:45:00Z",
    language: "ko",
    translatedTitle: "EAS Build Timeout When Building React Native Expo App",
  },
  {
    id: 5,
    title: "Zustand Store Not Persisting Across Page Navigation in Next.js",
    content: `
<p>Zustand store state was resetting every time the user navigated to a new page in a Next.js App Router project.</p>

<pre><code>// store.ts
import { create } from 'zustand';

export const useAuthStore = create((set) =&gt; ({
  user: null,
  setUser: (user) =&gt; set({ user }),
}));

// After login, navigating to /dashboard resets user to null</code></pre>

<h3>Cause</h3>
<p>The store was being imported in a Server Component, causing it to be recreated on each request. Zustand stores must only be used in Client Components.</p>

<h3>Solution</h3>
<p>Ensure all components using the store have the <code>"use client"</code> directive:</p>

<pre><code>"use client";

import { useAuthStore } from "@/store";

export default function Dashboard() {
  const user = useAuthStore((s) =&gt; s.user);
  return &lt;div&gt;Welcome, {user?.name}&lt;/div&gt;;
}</code></pre>

<p>For persistence across refreshes, add the <code>persist</code> middleware:</p>

<pre><code>import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) =&gt; ({
      user: null,
      setUser: (user) =&gt; set({ user }),
    }),
    { name: 'auth-storage' }
  )
);</code></pre>
    `.trim(),
    image_url: "",
    tags: ["Zustand", "Next.js", "React"],
    createdAt: "2025-07-22T16:00:00Z",
    language: "en",
    translatedTitle: "Next.js에서 페이지 이동 시 Zustand Store 초기화 문제",
  },
  {
    id: 6,
    title: "Astro client:load 컴포넌트에서 Hydration 타이밍이 꼬였던 문제",
    content: `
<p>Astro 페이지에 React 컴포넌트를 <code>client:load</code>로 붙였는데, 초기 마운트 직후 측정한 DOM 값이 의도와 다르게 나왔다.</p>

<pre><code>useEffect(() =&gt; {
  const rect = ref.current?.getBoundingClientRect();
  console.log(rect?.width); // 0 or unstable
}, []);</code></pre>

<h3>원인</h3>
<p>폰트 로드와 이미지 레이아웃 확정 전에 측정이 먼저 실행되고 있었다. 특히 절대 배치와 transform이 많은 섹션에서 차이가 크게 보였다.</p>

<h3>해결</h3>
<p><code>requestAnimationFrame</code> 두 번을 사용해서 실제 레이아웃이 정리된 뒤 측정하도록 바꿨다.</p>

<pre><code>useEffect(() =&gt; {
  requestAnimationFrame(() =&gt; {
    requestAnimationFrame(() =&gt; {
      const rect = ref.current?.getBoundingClientRect();
      console.log(rect);
    });
  });
}, []);</code></pre>
    `.trim(),
    image_url: "",
    tags: ["Astro", "React", "UI"],
    createdAt: "2025-08-02T10:10:00Z",
    language: "ko",
    translatedTitle: "Hydration Timing Issue in Astro client:load Component",
  },
  {
    id: 7,
    title: "Nginx Reverse Proxy 뒤에서 Vite HMR WebSocket 연결 실패",
    content: `
<p>원격 VM에서 Vite dev 서버를 프록시 뒤로 열었더니 화면은 뜨는데 HMR만 동작하지 않았다.</p>

<pre><code>WebSocket connection to 'wss://domain.dev:5173/' failed</code></pre>

<h3>원인</h3>
<p>Nginx가 <code>Upgrade</code>와 <code>Connection</code> 헤더를 넘기지 않았고, Vite의 HMR 호스트 설정도 외부 도메인 기준으로 맞춰져 있지 않았다.</p>

<h3>해결</h3>
<pre><code>server {
  location / {
    proxy_pass http://127.0.0.1:5173;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}</code></pre>

<p>그리고 <code>vite.config.ts</code>에서 HMR host를 명시했다.</p>
    `.trim(),
    image_url: "",
    tags: ["Vite", "Nginx", "DevOps"],
    createdAt: "2025-08-19T04:25:00Z",
    language: "ko",
    translatedTitle: "Vite HMR WebSocket Failure Behind Nginx Reverse Proxy",
  },
  {
    id: 8,
    title: "Prisma migration drift after switching branches",
    content: `
<p>After switching between two active feature branches, Prisma kept reporting migration drift even though the schema file looked correct.</p>

<pre><code>Error: The database schema is not in sync with the migration history.</code></pre>

<h3>Cause</h3>
<p>One branch had already applied a local migration to the dev database. The other branch expected a different migration chain, so the histories diverged.</p>

<h3>Solution</h3>
<p>I reset the local database, reapplied the current branch migrations, and avoided reusing the same dev DB across unrelated feature branches.</p>

<pre><code>npx prisma migrate reset
npx prisma migrate dev</code></pre>
    `.trim(),
    image_url: "",
    tags: ["Prisma", "Database", "Workflow"],
    createdAt: "2025-09-01T12:40:00Z",
    language: "en",
    translatedTitle: "브랜치 전환 후 Prisma migration drift가 발생한 문제",
  },
  {
    id: 9,
    title: "iOS Safari에서 position: sticky가 blur 배경과 충돌한 케이스",
    content: `
<p>iOS Safari에서 상단 sticky 헤더에 <code>backdrop-filter: blur()</code>를 적용했더니 스크롤 중 깜빡임과 겹침이 생겼다.</p>

<h3>원인</h3>
<p>Safari의 합성 레이어 처리와 sticky 요소의 재계산이 겹치면서 렌더링이 불안정해졌다.</p>

<h3>해결</h3>
<p>sticky 레이어의 blur 강도를 줄이고, 내부 요소에만 반투명 배경을 적용해 브라우저 부담을 낮췄다. 필요하면 모바일 Safari에서는 blur를 아예 끄는 조건부 스타일도 고려할 수 있다.</p>
    `.trim(),
    image_url: "",
    tags: ["Safari", "CSS", "Frontend"],
    createdAt: "2025-09-14T06:55:00Z",
    language: "ko",
    translatedTitle: "Sticky Header and Blur Background Conflict in iOS Safari",
  },
  {
    id: 10,
    title: "React Query cache returning stale detail data after mutation",
    content: `
<p>A detail page kept showing old values after an edit mutation, even though the mutation itself succeeded and the list page looked correct.</p>

<h3>Cause</h3>
<p>The list query was invalidated, but the detail query key was different and never refreshed.</p>

<h3>Solution</h3>
<pre><code>await mutation.mutateAsync(payload);
queryClient.invalidateQueries({ queryKey: ["posts"] });
queryClient.invalidateQueries({ queryKey: ["post", id] });</code></pre>

<p>It was a simple query key mismatch, but easy to miss because only one screen looked stale.</p>
    `.trim(),
    image_url: "",
    tags: ["React Query", "State", "Frontend"],
    createdAt: "2025-10-03T18:20:00Z",
    language: "en",
    translatedTitle: "mutation 이후 React Query 상세 데이터가 stale 상태로 남는 문제",
  },
  {
    id: 11,
    title: "TypeScript path alias가 Vitest에서만 해석되지 않았던 문제",
    content: `
<p>앱 빌드와 IDE에서는 정상인데 Vitest 실행 시에만 <code>@/components/Button</code> 같은 path alias가 깨졌다.</p>

<pre><code>Failed to resolve import "@/components/Button"</code></pre>

<h3>원인</h3>
<p><code>tsconfig.json</code>의 <code>paths</code> 설정만으로는 Vitest가 자동으로 alias를 따라가지 않았다.</p>

<h3>해결</h3>
<p><code>vite-tsconfig-paths</code>를 추가하거나, <code>vite.config.ts</code>에서 alias를 직접 맞춰줬다.</p>
    `.trim(),
    image_url: "",
    tags: ["TypeScript", "Vitest", "Tooling"],
    createdAt: "2025-10-11T09:15:00Z",
    language: "ko",
    translatedTitle: "TypeScript Path Alias Failing Only in Vitest",
  },
  {
    id: 12,
    title: "Supabase RLS policy blocked inserts from authenticated users",
    content: `
<p>Authenticated users were signed in correctly, but inserts still failed with a row-level security error.</p>

<pre><code>new row violates row-level security policy for table "profiles"</code></pre>

<h3>Cause</h3>
<p>The table had RLS enabled, but the insert policy only covered <code>select</code> and <code>update</code>, not <code>insert</code>.</p>

<h3>Solution</h3>
<pre><code>create policy "Users can insert their own profile"
on profiles for insert
to authenticated
with check (auth.uid() = id);</code></pre>
    `.trim(),
    image_url: "",
    tags: ["Supabase", "Auth", "Database"],
    createdAt: "2025-10-22T13:40:00Z",
    language: "en",
    translatedTitle: "인증된 사용자의 insert가 막히던 Supabase RLS policy 문제",
  },
  {
    id: 13,
    title: "Docker build cache 때문에 env 변경이 반영되지 않았던 사례",
    content: `
<p>분명 환경변수를 바꿨는데도 컨테이너가 이전 값을 계속 읽는 것처럼 보였다.</p>

<h3>원인</h3>
<p>빌드 단계에서 복사된 파일 레이어가 캐시되면서 실제 수정 내용이 이미지에 반영되지 않았다. 특히 <code>.env</code> 관련 복사 순서가 애매할 때 자주 발생했다.</p>

<h3>해결</h3>
<pre><code>docker compose build --no-cache
docker compose up -d</code></pre>

<p>그리고 Dockerfile의 <code>COPY</code> 순서를 다시 정리해 캐시가 예측 가능하도록 바꿨다.</p>
    `.trim(),
    image_url: "",
    tags: ["Docker", "Build", "DevOps"],
    createdAt: "2025-11-05T07:30:00Z",
    language: "ko",
    translatedTitle: "Env Changes Not Reflected Because of Docker Build Cache",
  },
  {
    id: 14,
    title: "Framer Motion layout animation jitter in responsive cards",
    content: `
<p>Card reflow animation looked smooth on desktop, but jittered badly when the grid collapsed on tablet width.</p>

<h3>Cause</h3>
<p>The layout animation was trying to interpolate between very different heights while images were still loading. That made the browser recalculate layout repeatedly.</p>

<h3>Solution</h3>
<p>I fixed card media ratios, reserved image space ahead of time, and reduced layout animation scope to the wrapper instead of every child.</p>
    `.trim(),
    image_url: "",
    tags: ["Framer Motion", "Responsive", "UI"],
    createdAt: "2025-11-18T15:05:00Z",
    language: "en",
    translatedTitle: "반응형 카드에서 Framer Motion layout animation이 떨리던 문제",
  },
  {
    id: 15,
    title: "GitHub Actions에서 pnpm lockfile mismatch로 CI가 깨진 문제",
    content: `
<p>로컬에서는 설치가 되는데 CI만 실패했다. 로그를 보니 lockfile과 package.json이 맞지 않았다.</p>

<pre><code>ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile"</code></pre>

<h3>원인</h3>
<p>의존성 버전은 바뀌었는데 lockfile을 커밋하지 않은 상태였다.</p>

<h3>해결</h3>
<p>로컬에서 <code>pnpm install</code> 후 lockfile까지 같이 커밋했고, 이후에는 의존성 변경 PR에서 lockfile diff를 따로 확인하는 습관을 만들었다.</p>
    `.trim(),
    image_url: "",
    tags: ["GitHub Actions", "CI", "pnpm"],
    createdAt: "2025-12-02T05:55:00Z",
    language: "ko",
    translatedTitle: "GitHub Actions CI Failing Because of pnpm Lockfile Mismatch",
  },
];
