import React,{useState} from 'react'
import {Box,Center,Heading,Text,Button,VStack,HStack,GridItem,Input,useToast} from '@chakra-ui/react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import {UPDATE_GOAL_MUTATION,DELETE_GOAL_MUTATION} from '../graphql/queries'



const GoalItem = ({goalName,time,id}) => {
    const [currentGoal,setCurrentGoal] = useState(goalName);
    const toast = useToast();

    // Mutation for Update current goal
    const [updateGoalMutation,updateGoalMutationResult] = useMutation(UPDATE_GOAL_MUTATION);
    if(updateGoalMutationResult.error) { console.log('Error Generated in Update Mutation : '+updateGoalMutationResult.error.message)}

    // Mutation for Delete current Goal
    const [deleteGoalMutation,deleteGoalMutationResult] = useMutation(DELETE_GOAL_MUTATION);
    if(deleteGoalMutationResult.error) { console.log('Error Generated in Delete Mutation : '+deleteGoalMutationResult.error.message)}


    // To update goal
    const UpdateGoal = () => {
        if(currentGoal===goalName){
            toast({
                title:'Change Goal to update',
                position: 'bottom',
                status:'error',
                isClosable:true
                
            })
        }
        else{
            // console.log('type of : '+typeof id)
            updateGoalMutation({variables:{currentID:id,newGoal:currentGoal}})
        }
    }

    // to Delete goal
    const DeleteGoal = () => {
        deleteGoalMutation({variables:{currentID:id}})
    }







    return (
        <Box  p={10} borderRadius='md'  borderWidth={2} colSpan={[3,2,1]} bg='blue.300'>
            <Center>
            <VStack>
                <Heading size='md' color='white' >{goalName}</Heading>
                <Heading size='md' color='white' >{new Date(time).toLocaleString('en-US')}</Heading>
                <Input bg='white' type='text' value={currentGoal} onChange={(e) => setCurrentGoal(e.target.value)} placeholder='Enter Name' />
                <HStack>
                    <Button w='full' onClick={() => UpdateGoal()} isLoading={updateGoalMutationResult.loading} loadingText="Saving" my={2} colorScheme='green' >Edit</Button>
                    <Button w='full' onClick={() => DeleteGoal()} isLoading={deleteGoalMutationResult.loading} loadingText="Deleting"  colorScheme='red'>Delete</Button>
                </HStack>
            </VStack>
            </Center>
        </Box>
    )
}

export default GoalItem