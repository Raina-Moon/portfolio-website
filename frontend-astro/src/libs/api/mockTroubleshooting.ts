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
];
