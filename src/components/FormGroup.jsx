import { Label } from "flowbite-react"

function FormGroup({ id, label, error, children }) {
    return (
        <div className="space-y-1">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
  
  export default FormGroup;
  