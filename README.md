This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## GoalSetter Full Stack App

### How to configure Project
1. Clone this repo.
2. Go to root directory of Project and run below commands 
   ```
   yarn
   ```
3. [Setup Hasura with Database](https://hasura.io/docs/latest/graphql/cloud/projects/create.html#step-2-database-setup)
4. Create .env.local file and add these variables value from Hasura console
    ```
    HASURA_SECRET
    HASURA_HTTP_URL
    HASURA_WSS_URL // For this change http with wss in url part
    ```
 5. Now you can run the project.
 
### Technologies
- [Hasura](https://hasura.io/)
- [NextJS](https://nextjs.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [Apollo Client](https://www.apollographql.com/)
- Postgresql Database 
