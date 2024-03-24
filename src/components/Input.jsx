import InputField from "./InputField";

export default function Input({className, name, value, setValue, type, id, placeholder, ...props}) {
  return (
    <div className={`flex w-full flex-col py-4 gap-1 ${className}`}>
        <label className=" text-slate-50 text-lg font-medium px-2">{name}</label>
        <InputField placeholder={placeholder} type={type} name={name} value={value} setValue={setValue} id={id?id:name}/>
    </div>
  )
}
