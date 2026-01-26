import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export const getblogByID = async (req, res) => {
  try {
    const { content } = req.params;

    const blog = await prisma.blogs.findFirst({
      where: { uniquiid: content },
      select: {
        title: true,
        content: true,
        likes: true,
        views: true,
        hashtags:true,
        created_at: true,
        author_id:true,
      },
    });
    const author = await prisma.user_profiles.findUnique({
      where: { user_id: blog.author_id },
      select: {
        username: true,
        followers_count: true,
        profile_image: true,

      },
    });
    const data = {
      authorname: author.username,
      authorfollowers: author.followers_count,
      authorprofilepic: author.profile_image,
      contenttitle: blog.title,
      contentpost: blog.content,
      contentlikes: blog.likes,
      contentviews: blog.views,
      contentuploaddate: blog.created_at,
    }
    if (!blog || !author) {
      return res.status(404).json({ message: "content or author not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("❌ Error fetching blog content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createblog = async (req, res) => {
  console.log("request ne entry li")
  try {
    const { title, fstpara, mainpara, lstpara, uniquiid, hashtags, author_id } = req.body;
    console.log("📩 Incoming data:", req.body);
    console.log(uniquiid)
    if (!title || !mainpara || !uniquiid || !hashtags || !author_id) {
      return res
        .status(400)
        .json({ message: "Credentials required" });
    }
    const existingByuId = await prisma.blogs.findFirst({
      where: { uniquiid: uniquiid },
    });

    if (existingByuId) {
      return res.status(400).json({
        success: false,
        message: "something went wrong",
      });
    }
    let content = ""
    if(!fstpara){
     content = content+mainpara +process.env.REACTREDUX+ lstpara}
    else if(!lstpara){
      content = content+fstpara +process.env.REACTREDUX+ mainpara
    }
    else if(!fstpara && !lstpara){
      content = content+mainpara
    }else{
      content = content+fstpara +process.env.REACTREDUX+ mainpara +process.env.REACTREDUX+ lstpara
    }

    const blogcontent = await prisma.blogs.create({
      data: {
        author_id: author_id,
        title: title,
        content: content,
        uniquiid: uniquiid,
        hashtags: hashtags || null,
      },
    });
    const blogcount = await prisma.user_profiles.findUnique({
      where: { user_id: author_id },
      select:{blog_count: true},
    });
    const increase = blogcount.blog_count + 1
    const update = await prisma.user_profiles.update({
      where: {user_id: author_id},
      data: {blog_count: increase}
    });
    console.log("✅ post saved:", blogcontent.uniquiid);
    res.status(201).json({
      success: true,
      message: "🎉 blog post created successfully!",

    });

  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const creatorblog = async (req, res) => {
  try {
    console.log("creatorblogs api loaded successfully");
    const { userid } = req.params;

    // 1️⃣ FIND AUTHOR PROFILE
    const author = await prisma.user_profiles.findUnique({
      where: { user_id: Number(userid) },
      select: {
        username: true,
        followers_count: true,
        profile_image: true,
      },
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // 2️⃣ FIND ALL BLOGS OF THIS AUTHOR
    const userblogs = await prisma.blogs.findMany({
      where: { author_id: Number(userid) },
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        views: true,
        created_at: true,
      },
      orderBy: {  
        created_at: "desc",
      },
    });
    for (let index = 0; index < userblogs.length; index++) {
userblogs[index].content = userblogs[index].content.split(process.env.REACTREDUX);
    }

    // 3️⃣ FINAL RESPONSE
    res.status(200).json({
      success: true,
      author: {
        name: author.username,
        followers: author.followers_count,
        profilePic: author.profile_image,
      },
      blogs: userblogs,   // 👈 ARRAY for scrolling
    });
  } catch (error) {
    console.error("❌ Error fetching blog content:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
