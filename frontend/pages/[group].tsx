import { useEffect } from "react";
import { useRouter } from "next/router";
import { Prisma, PrismaClient } from '@prisma/client'
import { userInfo } from "os";

const prisma = new PrismaClient()

const Details = ({ users }) => {
    const router = useRouter()
    
    // useEffect(() => {
    //     users.map(x => {
            
    //     });
    // }, [props.router])

    return (
        <div>
            {users.map(x => <div id={x.userPhone}> {x.userPhone} </div>)}
        </div>
    )
}


export async function getServerSideProps(ctx) {
    let users = await prisma.user.findMany({
        where: {
            groupCode: ctx.pathname, 
          }
        })
    
    users = users.map(x => {
        x.createdAt = Math.floor(x.createdAt / 1000)
        return x
    })

    return {
      props: { users }
    }
}

export default Details
