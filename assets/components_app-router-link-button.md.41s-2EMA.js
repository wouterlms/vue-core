import{_ as s,c as t,o as i,a4 as a}from"./chunks/framework.ry7th-P-.js";const u=JSON.parse('{"title":"AppRouterLinkButton","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"components/app-router-link-button.md","filePath":"components/app-router-link-button.md"}'),e={name:"components/app-router-link-button.md"},n=a(`<h1 id="approuterlinkbutton" tabindex="-1">AppRouterLinkButton <a class="header-anchor" href="#approuterlinkbutton" aria-label="Permalink to &quot;AppRouterLinkButton&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th>Prop</th><th>Type</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>to <strong>(required)</strong></td><td><code>RouteLocationNamedRaw</code></td><td>The route to link to.</td><td></td></tr><tr><td>iconLeft</td><td><code>Icon</code> | <code>null</code></td><td>The icon to display on the left side of the button.</td><td><code>null</code></td></tr><tr><td>iconRight</td><td><code>Icon</code> | <code>null</code></td><td>The icon to display on the right side of the button.</td><td><code>null</code></td></tr><tr><td>size</td><td><code>&#39;sm&#39;</code> | <code>&#39;default&#39;</code> | <code>&#39;lg&#39;</code></td><td>The size of the button.</td><td><code>&#39;default&#39;</code></td></tr><tr><td>variant</td><td><code>&#39;default&#39;</code> | <code>&#39;secondary&#39;</code> | <code>&#39;outline&#39;</code> | <code>&#39;ghost&#39;</code> | <code>&#39;destructive&#39;</code> | <code>&#39;destructive-outline&#39;</code></td><td>The variant of the button.</td><td><code>&#39;default&#39;</code></td></tr></tbody></table><h2 id="example-usage" tabindex="-1">Example Usage <a class="header-anchor" href="#example-usage" aria-label="Permalink to &quot;Example Usage&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { AppRouterLinkButton } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@wisemen/vue-core&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">AppRouterLinkButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;route-name&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Button Text</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">AppRouterLinkButton</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,5),l=[n];function p(h,d,o,k,r,c){return i(),t("div",null,l)}const g=s(e,[["render",p]]);export{u as __pageData,g as default};