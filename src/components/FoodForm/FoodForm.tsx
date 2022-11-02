import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import {
    chooseRank,
    chooseFood,
    choosePic,
} from '../../redux/slices/rootSlice';

import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface FoodFormProps {
    id?:string;
    data?:{}
}

interface FoodState{
    rank: string,
    food: string,
    description: string,
}

export const FoodForm = (props:FoodFormProps) => {
    const dispatch = useDispatch();
    let { foodData, getData } = useGetData();
    const store = useStore()
    const rank = useSelector<FoodState>(state => state.rank)
    const food = useSelector<FoodState>(state => state.food)
    const description = useSelector<FoodState>(state => state.description)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseRank(data.rank))
            dispatch(chooseFood(data.food))
            dispatch(choosePic(data.pic))

            await serverCalls.create(store.getState())
            window.location.reload()
            event.target.reset()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="rank">Rank</label>
                    <Input {...register('rank')} name='rank' placeholder='Rank'/>
                </div>
                <div>
                    <label htmlFor="food">Food</label>
                    <Input {...register('food')} name="food" placeholder="Food"/>
                </div>
                <div>
                    <label htmlFor="pic">Pic</label>
                    <Input {...register('pic')} name="pic" placeholder="Pic"/>
                </div>
       
                <Button type='submit'>Submit</Button>
            </form>

        </div>
    )
}