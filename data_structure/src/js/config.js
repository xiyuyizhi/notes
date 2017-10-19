
import select_sort from "./selectsort"
import quick_sort from "./partition"
import insert_sort from "./insertsort"
import up_down_merge_sort from "./up-down-mergesort"
import down_up_merge_sort from "./down-up-mergesort"

export const sortTypes = {
    1: select_sort,
    2: insert_sort,
    3: up_down_merge_sort,
    4: down_up_merge_sort,
    5: quick_sort
}