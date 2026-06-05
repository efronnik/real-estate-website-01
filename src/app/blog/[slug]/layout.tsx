import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resolveBlogPostMetadata } from "@/lib/page-metadata";

type BlogPostLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

type BlogPostMetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  return resolveBlogPostMetadata(slug);
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
