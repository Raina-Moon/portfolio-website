"use client";

import React, { useEffect, useRef } from 'react';

interface CodeBlockRendererProps {
  htmlContent: string;
}

export const CodeBlockRenderer: React.FC<CodeBlockRendererProps> = ({ htmlContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // 코드 블록 찾기 및 처리
    const codeBlocks = contentRef.current.querySelectorAll('pre');
    
    codeBlocks.forEach((pre) => {
      // 이미 처리된 블록인지 확인
      if (pre.closest('.code-block-wrapper')) return;

      const code = pre.querySelector('code');
      if (!code) return;

      // 언어 감지 (class 속성에서)
      let language = 'text';
      const classList = Array.from(code.classList);
      const langClass = classList.find(cls => cls.startsWith('language-'));
      if (langClass) {
        language = langClass.replace('language-', '');
      }

      // 코드 내용 가져오기
      const codeContent = code.textContent || '';

      // 새로운 코드 블록 래퍼 생성
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper relative my-6 rounded-lg overflow-hidden bg-gray-900 shadow-xl border border-gray-700';
      
      // 헤더 생성 (언어 표시 + 복사 버튼)
      const header = document.createElement('div');
      header.className = 'flex justify-between items-center px-4 py-3 bg-gray-800 text-gray-300 text-sm border-b border-gray-600';
      
      const langLabel = document.createElement('div');
      langLabel.className = 'flex items-center gap-2';
      
      // 언어 아이콘 추가
      const langIcon = document.createElement('div');
      langIcon.className = 'w-3 h-3 rounded-full';
      
      // 언어별 색상
      switch(language.toLowerCase()) {
        case 'javascript':
        case 'js':
          langIcon.style.backgroundColor = '#f7df1e';
          break;
        case 'typescript':
        case 'ts':
          langIcon.style.backgroundColor = '#007acc';
          break;
        case 'html':
          langIcon.style.backgroundColor = '#e34f26';
          break;
        case 'css':
          langIcon.style.backgroundColor = '#1572b6';
          break;
        case 'python':
        case 'py':
          langIcon.style.backgroundColor = '#3776ab';
          break;
        case 'json':
          langIcon.style.backgroundColor = '#000000';
          break;
        default:
          langIcon.style.backgroundColor = '#6b7280';
      }
      
      const langText = document.createElement('span');
      langText.textContent = language.charAt(0).toUpperCase() + language.slice(1);
      langText.className = 'font-medium text-gray-200';
      
      langLabel.appendChild(langIcon);
      langLabel.appendChild(langText);
      
      const copyButton = document.createElement('button');
      copyButton.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span class="ml-1">Copy</span>
      `;
      copyButton.className = 'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500';
      copyButton.title = 'Copy code to clipboard';
      
      // 복사 기능
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeContent);
          
          // 성공 피드백
          copyButton.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="ml-1">Copied!</span>
          `;
          copyButton.className = 'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-green-600 hover:bg-green-700 transition-all duration-200 text-white border border-green-500';
          
          // 2초 후 원래 상태로 복구
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span class="ml-1">Copy</span>
            `;
            copyButton.className = 'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
          
          // 에러 피드백
          copyButton.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span class="ml-1">Failed</span>
          `;
          copyButton.className = 'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-red-600 hover:bg-red-700 transition-all duration-200 text-white border border-red-500';
          
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span class="ml-1">Copy</span>
            `;
            copyButton.className = 'flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500';
          }, 2000);
        }
      });
      
      header.appendChild(langLabel);
      header.appendChild(copyButton);
      
      // 새로운 코드 엘리먼트 생성
      const newPre = document.createElement('pre');
      newPre.className = 'relative p-0 overflow-x-auto text-sm bg-gray-900 text-gray-100 m-0 font-mono leading-relaxed';
      newPre.style.fontFamily = "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 'Source Code Pro', monospace";
      
      // 라인 번호와 코드를 감싸는 컨테이너
      const codeContainer = document.createElement('div');
      codeContainer.className = 'flex';
      
      // 라인 번호 생성
      const lines = codeContent.split('\n');
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'flex flex-col text-gray-500 text-xs py-6 px-4 bg-gray-800 border-r border-gray-700 select-none';
      lineNumbers.style.minWidth = `${Math.max(2, lines.length.toString().length + 1) * 0.6}rem`;
      
      lines.forEach((_, index) => {
        const lineNum = document.createElement('div');
        lineNum.textContent = (index + 1).toString();
        lineNum.className = 'text-right leading-relaxed';
        lineNumbers.appendChild(lineNum);
      });
      
      // 코드 부분
      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'flex-1 p-6';
      
      const newCode = document.createElement('code');
      newCode.className = `language-${language} block`;
      newCode.textContent = codeContent;
      
      // 언어별 하이라이팅 적용
      applyLanguageHighlighting(newCode, language);
      
      // 코드 래퍼에 코드 추가
      codeWrapper.appendChild(newCode);
      
      // 컨테이너 구성
      codeContainer.appendChild(lineNumbers);
      codeContainer.appendChild(codeWrapper);
      
      // pre에 컨테이너 추가
      newPre.appendChild(codeContainer);
      
      // 래퍼 구성
      wrapper.appendChild(header);
      wrapper.appendChild(newPre);
      
      // 기존 요소 교체
      pre.parentNode?.replaceChild(wrapper, pre);
    });
  }, [htmlContent]);

  return (
    <div 
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="mt-7 mb-20 prose prose-lg max-w-none
                 [&_p]:mb-4 
                 [&_br]:block [&_br]:mb-2
                 [&_.hard-break]:block [&_.hard-break]:mb-2
                 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8
                 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6
                 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4
                 [&_ul]:mb-4 [&_ol]:mb-4
                 [&_li]:mb-1
                 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
                 whitespace-pre-wrap"
    />
  );
};

// 개선된 언어별 하이라이팅 함수
function applyLanguageHighlighting(codeElement: HTMLElement, language: string) {
  const text = codeElement.textContent || '';
  let highlightedText = text;
  
  // HTML 엔티티 디코딩
  highlightedText = highlightedText.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  
  if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts' || language === 'jsx' || language === 'tsx') {
    // JavaScript/TypeScript 하이라이팅
    
    // 1. 먼저 문자열 하이라이팅 (가장 우선순위)
    highlightedText = highlightedText.replace(
      /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
      '<span class="text-green-300">$1$2$1</span>'
    );
    
    // 2. 템플릿 리터럴 내 변수
    highlightedText = highlightedText.replace(
      /\$\{([^}]+)\}/g,
      '<span class="text-yellow-300">${<span class="text-white">$1</span>}</span>'
    );
    
    // 3. 주석 하이라이팅
    highlightedText = highlightedText.replace(
      /\/\/.*$/gm,
      '<span class="text-gray-400 italic">$&</span>'
    );
    
    highlightedText = highlightedText.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span class="text-gray-400 italic">$&</span>'
    );
    
    // 4. 키워드 하이라이팅
    const keywords = [
      'abstract', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 
      'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 
      'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let', 'new', 'null', 
      'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'undefined', 'var', 'void', 
      'while', 'with', 'yield', 'type', 'namespace', 'module', 'declare', 'public', 'private', 'protected',
      'readonly', 'static', 'from', 'as'
    ];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b(?!['">\w])`, 'g');
      highlightedText = highlightedText.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`);
    });
    
    // 5. 함수명 하이라이팅
    highlightedText = highlightedText.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      '<span class="text-blue-300">$1</span>'
    );
    
    // 6. 숫자 하이라이팅
    highlightedText = highlightedText.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="text-orange-300">$1</span>'
    );
    
    // 7. 연산자 하이라이팅
    highlightedText = highlightedText.replace(
      /(\+|\-|\*|\/|%|=|==|===|!=|!==|<|>|<=|>=|&&|\|\||!|\?|:)/g,
      '<span class="text-pink-400">$1</span>'
    );
    
  } else if (language === 'html' || language === 'xml') {
    // HTML 하이라이팅
    
    // 태그 하이라이팅
    highlightedText = highlightedText.replace(
      /<(\/?)([\w-]+)([^>]*?)>/g,
      (match, slash, tagName, attributes) => {
        let result = `<span class="text-red-400">&lt;${slash}</span><span class="text-red-300 font-semibold">${tagName}</span>`;
        
        // 속성 하이라이팅
        if (attributes) {
          const highlightedAttrs = attributes.replace(
            /([\w-]+)(=)?(["']?)([^"']*?)\3/g,
            '<span class="text-yellow-300">$1</span><span class="text-pink-400">$2</span><span class="text-green-300">$3$4$3</span>'
          );
          result += highlightedAttrs;
        }
        
        result += '<span class="text-red-400">&gt;</span>';
        return result;
      }
    );
    
  } else if (language === 'css' || language === 'scss' || language === 'sass') {
    // CSS 하이라이팅
    
    // 주석
    highlightedText = highlightedText.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span class="text-gray-400 italic">$&</span>'
    );
    
    // 선택자
    highlightedText = highlightedText.replace(
      /([.#]?[\w-]+(?:\[[^\]]*\])?(?:::?[\w-]+)?)\s*{/g,
      '<span class="text-yellow-300">$1</span> <span class="text-white">{</span>'
    );
    
    // 속성
    highlightedText = highlightedText.replace(
      /([\w-]+)\s*:/g,
      '<span class="text-blue-300">$1</span><span class="text-white">:</span>'
    );
    
    // 값
    highlightedText = highlightedText.replace(
      /:\s*([^;{]+)/g,
      ': <span class="text-green-300">$1</span>'
    );
    
  } else if (language === 'json') {
    // JSON 하이라이팅
    
    // 문자열 키
    highlightedText = highlightedText.replace(
      /"([^"]+)"\s*:/g,
      '<span class="text-blue-300">"$1"</span><span class="text-white">:</span>'
    );
    
    // 문자열 값
    highlightedText = highlightedText.replace(
      /:\s*"([^"]*)"/g,
      ': <span class="text-green-300">"$1"</span>'
    );
    
    // 숫자
    highlightedText = highlightedText.replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span class="text-orange-300">$1</span>'
    );
    
    // boolean 및 null
    highlightedText = highlightedText.replace(
      /:\s*(true|false|null)/g,
      ': <span class="text-purple-400">$1</span>'
    );
    
  } else if (language === 'python' || language === 'py') {
    // Python 하이라이팅
    
    // 문자열
    highlightedText = highlightedText.replace(
      /(["']{1,3})((?:\\.|(?!\1)[^\\])*?)\1/g,
      '<span class="text-green-300">$1$2$1</span>'
    );
    
    // 주석
    highlightedText = highlightedText.replace(
      /#.*$/gm,
      '<span class="text-gray-400 italic">$&</span>'
    );
    
    // 키워드
    const pythonKeywords = [
      'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 
      'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 
      'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield', 'True', 'False', 'None'
    ];
    
    pythonKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlightedText = highlightedText.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`);
    });
    
    // 함수명
    highlightedText = highlightedText.replace(
      /\bdef\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
      '<span class="text-purple-400 font-semibold">def</span> <span class="text-blue-300">$1</span>'
    );
    
    // 숫자
    highlightedText = highlightedText.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="text-orange-300">$1</span>'
    );
  }
  
  // HTML 엔티티 다시 인코딩 (< > & 문자들)
  highlightedText = highlightedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  codeElement.innerHTML = highlightedText;
}