import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const getAllPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;
  const normalizedSearch = search.trim();

  const where: any = {
    AND: [
      normalizedSearch && {
        OR: [
          {
            title: { contains: normalizedSearch, mode: "insensitive" },
          },
          {
            content: { contains: normalizedSearch, mode: "insensitive" },
          },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags &&
        tags?.length > 0 && {
          tags: {
            hasEvery: tags,
          },
        },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
  });

  return result;
};

const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
