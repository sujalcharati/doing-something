import { prisma } from "./db"

async function main() {
    
    const user = await prisma.user.create({
            data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: {
          title: "Hello World",
          content: "This is my first post!",
          published: true,
        },
      },
    },
    });

    console.log(" users connected ", user)

    const allusers = await prisma.user.findMany()

    console.log( JSON.stringify(allusers));
}

main()
 .then( async ( )=>{
         await prisma.$disconnect();
 })
 .catch( async (e)=>{
  console.error(e);
   await prisma.$disconnect();
   process.exit();
 })