import React, { useState } from 'react'
import { withApollo } from '../graphql/apollo'
import { GET_GOALS_QUERY, CREATE_GOAL_MUTATION, GOAL_SUBSCRIPTION } from '../graphql/queries'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { Center, Container, Spinner, Flex, SimpleGrid, GridItem, Input, Button, HStack, Heading, VStack, FormControl, useToast } from '@chakra-ui/react'
import GoalItem from '../components/GoalItem'

const index = () => {

  // const { data, loading, error } = useQuery(GET_GOALS_QUERY);
  const toast = useToast()

  // Here Subscription will change data on realtime update and display it on screen
  const { data, loading, error } = useSubscription(GOAL_SUBSCRIPTION);

  const resetNewGoal = () => {
    setNewGoal('')
  }
  // THis mutation used to add new goal and after completing operation it will call resetNewGoal
  const [addGoalMutation, addGoalMutationResult] = useMutation(CREATE_GOAL_MUTATION, { onCompleted: resetNewGoal });
  if (addGoalMutationResult.error) { console.log(addGoalMutationResult.error.message) }

  const allGoals = data ? data.goals : [];
  const [newGoal, setNewGoal] = useState("");

  const onAdd = () => {
    // e.preventDefault()
    if (newGoal === "") {
      toast({
        title: 'Enter new Goal to add',
        status: 'error',
        isClosable: true,
        position: 'bottom'
      })

    }
    else {
      addGoalMutation({ variables: { newGoalName: newGoal } })

    }
  }

  return (
    <Container maxWidth='container.xl'>
      <Flex minHeight='100vh'>
        <Center h='full' w='full' p={0} m={0}  >
          <VStack w='full' spacing={3}>
            <Heading size='2xl' color='lightskyblue'>Add New Goal</Heading>
            <HStack w='full' >
              <Input type='text' onChange={(e) => setNewGoal(e.target.value)} value={newGoal} required={true} mb={2} w='full' placeholder='Enter new Goal Here' />
            </HStack>
            <Button isLoading={addGoalMutationResult.loading} loadingText="Adding Goal" w='full' type='button' onClick={() => onAdd()} colorScheme='blue'>Add </Button>

            {loading ? (
              <Spinner
                mt={5}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            ) :
              (
                <SimpleGrid columns={[1, 2, 3]} spacing={2}  >
                  {allGoals.map(goal => (
                    <GoalItem key={goal.id} goalName={goal.goalName} time={goal.timeStamp} id={goal.id} />
                  ))}
                </SimpleGrid>
              )}
          </VStack>
        </Center>
      </Flex>
    </Container >
  )
}

export default withApollo(index, { ssr: false })