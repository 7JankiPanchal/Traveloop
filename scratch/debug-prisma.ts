import prisma from '../src/lib/prisma'

async function main() {
  console.log('Available models on prisma client:')
  const keys = Object.keys(prisma)
  console.log(keys.filter(k => !k.startsWith('_') && !k.startsWith('$')))
  
  try {
    console.log('Attempting to findMany on communityPost...')
    // @ts-ignore
    const posts = await prisma.communityPost.findMany()
    console.log('Success!', posts.length)
  } catch (e:any) {
    console.error('Error accessing communityPost:', e.message)
  }
}

main()
