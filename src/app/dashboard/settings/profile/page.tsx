"use client";

import Link from "next/link";
import { ChevronLeft, Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import { Avatar } from "@/components/Avatar";

export default function ProfileSettings() {
  const { user, profile, updateProfile } = useUser();
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(profile?.full_name || "");
  const [isEditingName, setIsEditingName] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0] || !user) return;
    setUploading(true);
    
    try {
      const file = acceptedFiles[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      await updateProfile({ avatar_url: data.publicUrl });
    } catch (error) {
      console.error(error);
      alert("Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
    multiple: false
  });

  const saveName = async () => {
    if (name !== profile?.full_name) {
      await updateProfile({ full_name: name });
    }
    setIsEditingName(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/dashboard/settings" className="flex items-center gap-2 text-[#6B7280] hover:text-[#0A0A0A] dark:hover:text-white transition-colors mb-6 w-fit">
        <ChevronLeft size={16} /> Settings
      </Link>

      <h1 className="text-2xl font-semibold text-[#0A0A0A] dark:text-white mb-8">Profile</h1>

      <div className="space-y-6">
        <div className="glass-card p-6 flex flex-col items-center sm:flex-row gap-6">
          <div {...getRootProps()} className="relative cursor-pointer group">
            <input {...getInputProps()} />
            <Avatar src={profile?.avatar_url} name={profile?.full_name || ""} size={80} className="shadow-md" />
            <div className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center transition-opacity ${isDragActive || uploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              {uploading ? <Loader2 size={24} className="text-white animate-spin" /> : <Camera size={24} className="text-white" />}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#0A0A0A] dark:text-white mb-1">Profile Photo</h3>
            <p className="text-sm text-[#6B7280] mb-3">Recommended size: 256x256px. JPG or PNG.</p>
            <button {...getRootProps()} className="h-8 px-4 rounded-lg bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] text-sm font-medium transition-colors">
              Upload new
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <div className="flex-1">
              <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-1">Full Name</label>
              {isEditingName ? (
                <input
                  autoFocus
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={saveName}
                  onKeyDown={e => e.key === "Enter" && saveName()}
                  className="bg-transparent border-b border-[#F97316] outline-none text-[#0A0A0A] dark:text-white w-full py-1"
                />
              ) : (
                <p className="text-[15px] font-medium text-[#0A0A0A] dark:text-white cursor-pointer" onClick={() => setIsEditingName(true)}>
                  {profile?.full_name || "Add your name"}
                </p>
              )}
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold block mb-1">Email Address</label>
              <p className="text-[15px] font-medium text-[#374151] dark:text-[#D1D5DB]">
                {profile?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
