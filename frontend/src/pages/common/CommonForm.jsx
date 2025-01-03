import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select,SelectTrigger,SelectItem,SelectContent,SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

 const CommonForm  = ({formControls,formdata,setformdata,onSubmit,buttonText,isBtnDisabled}) => {

    const renderInputItems = (controlItem) => {
    let element = null;
    const value = formdata[controlItem.name] || "";

    switch (controlItem.componentType){
        case "input":
            element = (
                <Input
                  name={controlItem.name}
                  placeholder={controlItem.placeholder}
                  id={controlItem.name}
                  type={controlItem.type}
                  value={value}
                  onChange={(e) => {    
                    setformdata({
                        ...formdata,[controlItem.name] : e.target.value
                    })
                  }}  
                />
            )
             break;
           
        case "select":
             element =(
                <Select
                   onValueChange={(value) => {
                      setformdata({
                        ...formdata,[controlItem.name] : value,
                      })
                   }}
                  value={value}
                >
                 <SelectTrigger className="w-full">
                    <SelectValue placeholder={controlItem.label} />
                 </SelectTrigger>
                 <SelectContent>
                    {controlItem.options && controlItem.options.length > 0 ? 
                       controlItem.options.map((optionsItem) => (
                        <SelectItem key={optionsItem.id} value={optionsItem.label}>
                           {optionsItem.label}
                        </SelectItem>
                       )) : null 
                  }
                 </SelectContent>
                </Select>
             );
             break;
        
        case "textarea":
            element = (
              <Textarea
               name={controlItem.name}
               placeholder={controlItem.placeholder}
               id={controlItem.id}
               value={controlItem.value}
               onChange={(e) => {
                setformdata({
                    ...formdata,[controlItem.name] : e.target.value
                })
               }}
              />
            )
          break;

        default:
            element = (
              <Input
                name={controlItem.name}
                placeholder={controlItem.placeholder}
                id={controlItem.name}
                type={controlItem.type}
                value={value}
                onChange={(event) =>
                  setformdata({
                    ...formdata,
                    [controlItem.name]: event.target.value,
                  })
                }
              />
            );
        break;      
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3"> 
        {formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
             <Label className="mb-1">{controlItem.label}</Label>
             {renderInputItems(controlItem)} 
            </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  )
}

export default CommonForm;