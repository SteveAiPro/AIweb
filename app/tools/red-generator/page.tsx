"use client";

import { useState, useRef, useEffect } from "react";

export default function RedGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  // 自动滚动到结果区域
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("请输入主题或产品");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), userInfo: userInfo.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "生成失败，请稍后重试");
        setLoading(false);
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        text += chunk;
        setResult(text);
      }
    } catch (err) {
      setError("网络请求失败，请检查网络连接");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTopic("");
    setUserInfo("");
    setResult("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff5f5] to-white">
      {/* Header */}
      <header className="border-b border-red-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📕</span>
            <h1 className="text-lg font-bold text-[#ff2442]">
              小红书爆款生成器
            </h1>
          </div>
          <span className="text-xs text-gray-400">AI · 种草美学大师</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {/* 输入区域 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">✨</span>
            <h2 className="text-base font-semibold text-gray-800">
              输入你的创作需求
            </h2>
          </div>

          {/* 主题输入 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题 / 产品 <span className="text-[#ff2442]">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError("");
              }}
              placeholder="例如：早C晚A护肤流程、租房改造好物、初学者健身计划..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2442] focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
          </div>

          {/* 用户信息（可选） */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              补充信息{" "}
              <span className="text-gray-400 text-xs font-normal">
                （可选，让文案更精准）
              </span>
            </label>
            <textarea
              value={userInfo}
              onChange={(e) => setUserInfo(e.target.value)}
              placeholder="例如：我是美妆博主，主打平价护肤品，粉丝以大学生为主..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff2442] focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm resize-none"
              disabled={loading}
            />
          </div>

          {/* 错误提示 */}
          {error && (
            <p className="text-sm text-red-500 mb-3 flex items-center gap-1">
              <span>⚠️</span> {error}
            </p>
          )}

          {/* 按钮组 */}
          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 h-11 bg-[#ff2442] hover:bg-[#e6203a] disabled:bg-gray-300 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <span className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                  正在生成中...
                </>
              ) : (
                <>
                  <span>🚀</span> 生成爆款文案
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-5 h-11 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 rounded-xl transition-colors text-sm"
            >
              清空
            </button>
          </div>
        </div>

        {/* 结果展示区域 */}
        {(result || loading) && (
          <div
            ref={resultRef}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <span className="text-xl">📝</span>
              <h2 className="text-base font-semibold text-gray-800">
                生成结果
              </h2>
              {loading && (
                <span className="text-xs text-[#ff2442] typing-cursor">
                  生成中
                </span>
              )}
              {!loading && result && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                  }}
                  className="ml-auto text-xs text-gray-400 hover:text-[#ff2442] transition-colors flex items-center gap-1"
                >
                  <span>📋</span> 复制全文
                </button>
              )}
            </div>

            {loading && !result && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            )}

            {result && (
              <div className="markdown-body text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            )}
          </div>
        )}

        {/* 空状态引导 */}
        {!result && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-gray-400 text-sm">
              输入主题或产品，一键生成小红书爆款图文方案
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "早C晚A护肤",
                "租房改造",
                "减脂餐食谱",
                "通勤穿搭",
                "自学编程",
              ].map((hint) => (
                <button
                  key={hint}
                  onClick={() => setTopic(hint)}
                  className="px-3 py-1.5 text-xs text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-[#ff2442] rounded-full transition-colors border border-gray-100"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center">
        <p className="text-xs text-gray-400">
          📕 小红书爆款图文专家 · 种草美学大师 · AI 驱动
        </p>
      </footer>
    </div>
  );
}
