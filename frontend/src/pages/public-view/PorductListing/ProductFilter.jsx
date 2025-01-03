import { Label } from "@/components/ui/label"
import { filterOptions } from "@/utils/DummyData/AddProductsData"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const ProductFilter = ({filter, handelFilter}) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
       <div className="p-4 border-b fixed top-20">
         <h2 className="text-lg font-semibold">
            Filters
         </h2>
         <div className="p-4 space-y-4">
              {Object.keys(filterOptions).map(ItemKey => <>
                 <div>
                    <h3 className="text-base font-bold">{ItemKey}</h3>
                    <div className="grid gap-2 mt-2">
                     {filterOptions[ItemKey].map(optionItem => 
                     <Label className="flex items-center gap-2 font-medium">
                        <Checkbox
                         checked={
                           filter && Object.keys(filter).length > 0 &&
                           filter[ItemKey] && filter[ItemKey].indexOf(optionItem.id) > -1    
                         }
                         onCheckedChange={() => handelFilter(ItemKey, optionItem?.id)}/>
                         {optionItem.label}
                     </Label>
                     )}
                    </div>
                 </div>
                <Separator/>
              </>
            )}
         </div>
       </div>
    </div>
  )
}

export default ProductFilter
