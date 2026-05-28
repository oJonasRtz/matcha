"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "../public/card";
import { Trash, ImagePlus, Star, Camera, FileText, Tags, Save } from "lucide-react";

type Photo = {
  id: string;
  dataUrl: string;
};

export default function UserProfileEditor() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const raw = localStorage.getItem("profile_photos");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [description, setDescription] = useState(() => localStorage.getItem("profile_description") || "");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("profile_tags");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => void localStorage.setItem("profile_photos", JSON.stringify(photos)), [photos]);
  useEffect(() => void localStorage.setItem("profile_description", description), [description]);
  useEffect(() => void localStorage.setItem("profile_tags", JSON.stringify(tags)), [tags]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files).slice(0, 5 - photos.length);
    incoming.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((p) => [...p, { id: String(Date.now()) + Math.random().toString(36).slice(2, 7), dataUrl: String(reader.result) }]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(id: string) {
    setPhotos((p) => p.filter((x) => x.id !== id));
  }

  function setAsProfile(id: string) {
    setPhotos((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx <= 0) return p;
      const copy = [...p];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      return copy;
    });
  }

  function addTag(value: string) {
    const v = value.trim();
    if (!v || tags.includes(v)) return;
    setTags((t) => [...t, v]);
  }

  function removeTag(i: number) {
    setTags((t) => t.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <Card className="border-rose-300/20 bg-gradient-to-br from-rose-500/15 via-red-500/5 to-white/5 shadow-[0_18px_40px_rgba(244,63,94,0.18)]">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/80">Profile editor</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Customize your profile</h2>
          <p className="mt-1 text-sm text-rose-100/70">Organize your profile details to get better matches.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-2xl border border-rose-300/30 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:bg-rose-500/30"
          >
            <Camera className="h-4 w-4" />
            Upload photos
          </button>

          <button
            type="button"
            onClick={() => { alert("Profile saved (local only)"); }}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            <Save className="h-4 w-4" />
            Save profile
          </button>

          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>
      </Card>

      <Card className="border-rose-300/20 bg-black/35">
        <div className="mb-3 flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-rose-300" />
          <h3 className="text-lg font-semibold text-white">Images</h3>
        </div>

        <p className="text-sm text-white/60">Up to 5 photos. The first one is your profile photo.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="relative w-28">
              <img src={photo.dataUrl} alt={`photo-${idx}`} className="h-28 w-28 rounded-xl border border-white/10 object-cover" />
              {idx === 0 ? (
                <span className="absolute bottom-1 left-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  Profile
                </span>
              ) : null}
              <div className="absolute right-1 top-1 flex items-center gap-1">
                <button title="Set as profile" onClick={() => setAsProfile(photo.id)} className="rounded-full bg-black/45 p-1 text-white transition hover:bg-rose-500/70">
                  <Star className="h-4 w-4" />
                </button>
                <button title="Remove" onClick={() => removePhoto(photo.id)} className="rounded-full bg-black/45 p-1 text-white transition hover:bg-red-500/70">
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {photos.length < 5 ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-28 w-28 items-center justify-center rounded-xl border border-dashed border-rose-300/30 bg-rose-500/10 text-rose-100 transition hover:bg-rose-500/20"
            >
              <ImagePlus className="h-6 w-6" />
            </button>
          ) : null}
        </div>
      </Card>

      <Card className="border-rose-300/20 bg-black/35">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-rose-300" />
          <h3 className="text-lg font-semibold text-white">Description</h3>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="Tell people who you are, what you like and what you are looking for..."
          className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
        />
      </Card>

      <Card className="border-rose-300/20 bg-black/35">
        <div className="mb-3 flex items-center gap-2">
          <Tags className="h-5 w-5 text-rose-300" />
          <h3 className="text-lg font-semibold text-white">Tags</h3>
        </div>

        <p className="text-sm text-white/60">Add interests or vibes that define your profile.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {tags.map((t, i) => (
            <span key={t} className="flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/15 px-3 py-1 text-sm text-rose-50">
              <span>#{t}</span>
              <button type="button" onClick={() => removeTag(i)} className="text-rose-100/80 transition hover:text-white">x</button>
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-white outline-none transition placeholder:text-white/40 focus:border-rose-300/40 focus:ring-2 focus:ring-rose-400/20"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(newTag);
                setNewTag("");
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              addTag(newTag);
              setNewTag("");
            }}
            className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 font-semibold text-white transition hover:from-rose-400 hover:to-red-400"
          >
            Add
          </button>
        </div>
      </Card>
    </div>
  );
}
