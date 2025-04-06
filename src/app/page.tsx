"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";


type Prompt = {
  id: number;
  category: string[]; 
  text: string;
  image: string;
  model: string;
};

export default function PromptBoard() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMoreCategories, setShowMoreCategories] = useState<boolean>(false);


  useEffect(() => {
    const fetchPrompts = async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order('id', { ascending: false });
      if (error) {
        console.error("Error fetching prompts:", error.message);
      } else {
        setPrompts(data);
      }
    };
    fetchPrompts();
  }, []);

  const handleCopy = (text: string, id?: number) => {
    const isEditing = id && editingId === id;
    const textToCopy = isEditing ? editedText : text;
  
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id ?? null);
  
    if (isEditing) {
      setEditingId(null);
      setEditedText("");
    }
  
    setTimeout(() => {
      setCopiedId(null);
    }, 1500); // 表示時間：1.5秒
  };
  
  

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);

    setTimeout(() => {
      setEditingId(null);
      setEditedText("");
    }, 1500); // 表示時間：1.5秒
  };

  // カテゴリー一覧（重複除去）
  const allCategories = Array.from(
    new Set(prompts.flatMap((p) => p.category))
  );
  const categories = ["すべて", ...allCategories];
  
  // 表示するカテゴリーを制限
  const visibleCategories = showMoreCategories 
    ? categories 
    : categories.slice(0, 3); // 最初の3つだけ表示

  // フィルター処理（複数カテゴリ対応）
  const filteredPrompts =
    selectedCategory === "すべて"
      ? prompts
      : prompts.filter((p) => p.category.includes(selectedCategory));

  // 検索フィルター処理
  const searchedPrompts = searchQuery
    ? filteredPrompts.filter((p) =>
        p.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPrompts;

  return (
    <div className="p-4">
      <header className="fixed top-0 left-0 w-full h-16 bg-background z-10 p-2 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={52} height={52} className="rounded-full"/>
      </header>
      <div className="mt-16 mb-4">
        <input
          type="text"
          placeholder="プロンプトを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 p-2 rounded-full mb-3 bg-gray-100 text-gray-600" 
          style={{ fontFamily: 'var(--font-line-seed-bd)' }}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            <AnimatePresence>
              {visibleCategories.map((cat) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant={cat === selectedCategory ? "default" : "secondary"}
                    onClick={() => setSelectedCategory(cat)}
                    className="cursor-pointer h-10 rounded-full"
                    style={{ fontFamily: 'var(--font-line-seed-bd)' }}
                  >
                    {cat}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {categories.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="w-full text-white/70 bg-white/10"
              style={{ fontFamily: 'var(--font-line-seed-bd)' }}
            >
              {showMoreCategories ? "カテゴリーを隠す" : "もっと見る"}
            </Button>
          )}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-3 space-y-3">
        {searchedPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="relative group rounded-3xl overflow-hidden break-inside-avoid"
          >
            <Image
              src={prompt.image}
              alt={prompt.category.join(", ")}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-2xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 space-y-2 opacity-0 group-hover:opacity-100"
              onTouchStart={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget;
                setTimeout(() => {
                  if (target && target.style.opacity === "1") {
                    target.style.opacity = "0";
                  }
                }, 2000);
              }}
            >

              {/* モデル */}
              <div className="rounded-sm bg-white/20 p-1 w-fit">
                <div className="text-white text-xs" style={{ fontFamily: 'var(--font-line-seed-rg)' }}>
                  {prompt.model}
                </div>
              </div>
              {/* カテゴリー */}
              <div className="text-white text-md " style={{ fontFamily: 'var(--font-line-seed-rg)' }}>
                {prompt.category.join(" / ")}
              </div>

              {/* テキスト or 編集中エリア */}
              {editingId === prompt.id ? (
                <Textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="bg-white text-black"
                  style={{ fontFamily: 'var(--font-line-seed-rg)' }}
                />
              ) : (
                <div className="text-white text-xs line-clamp-3" style={{ fontFamily: 'var(--font-line-seed-rg)' }}>{prompt.text}</div>
              )}

              {/* ボタン */}
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleCopy(prompt.text, prompt.id)}
                  className="cursor-pointer"
                  style={{ fontFamily: 'var(--font-line-seed-bd)' }}
                >
                  コピー
                </Button>
                {editingId !== prompt.id && (
                  <Button 
                    size="sm" 
                    onClick={() => handleEdit(prompt.id, prompt.text)}
                    className="cursor-pointer"
                    style={{ fontFamily: 'var(--font-line-seed-bd)' }}
                  >
                    編集
                  </Button>
                )}
              </div>
            </motion.div>
            <AnimatePresence>
              {copiedId === prompt.id && (
                <motion.div
                  key="copied-toast"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit bg-white text-black px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ fontFamily: 'var(--font-line-seed-bd)' }}
                >
                  コピーしました
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

