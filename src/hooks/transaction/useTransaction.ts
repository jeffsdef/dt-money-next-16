import { createTransaction, getTransactions } from "@/services/transaction";
import { ITransaction } from "@/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "transactions";

const Create = () =>  {
   const queryClient = useQueryClient(); 

   return useMutation({
      mutationFn: (transaction: ITransaction) => createTransaction(transaction),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      }
   })
}


const FindAll = () => {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: getTransactions
    })
}

export const useTransaction = {
    Create,
    FindAll
}

