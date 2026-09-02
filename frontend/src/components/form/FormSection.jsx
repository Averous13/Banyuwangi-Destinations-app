import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';;
import { BANK_TYPES, BUSINESS_TYPES } from '@/config/data';
import { Input } from '@/components/ui/input';

const OPTIONS_MAP = {BANK_TYPES, BUSINESS_TYPES}


const FormField = ({ field, value, onChange}) => {
  if (field.type === 'select') {
    const options = OPTIONS_MAP[field.optionsKey] || [];
    return (
      <Select
        value={value}
        required={field.required}
        onValueChange={(val) =>
          onChange({target: { name: field.name, value: val}})
        }>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={field.placeholder}/>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem value={opt.value} key={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
      </Select>
    )
  }

  return (
    <Input
      name={field.name}
      type={field.type}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
      className='h-12'
      required={field.required}
      minLength={field.minLength}
    />
  )
}

const FormSection = ({ step, data, onChange, error }) => {
  const rendered = [];
  for (let i = 0; i < step.fields.length; i++) {
    const field = step.fields[i];
    if (field.layout === 'half') {
      const next = step.fields[i + 1];
      if (next?.layout === 'half') {
        rendered.push(
          <div className='grid grid-cols-2 gap-2' key={field.name}>
            <FormField field={field} value={data[field.name]} onChange={onChange}/>
            <FormField field={next} value={data[next.name]} onChange={onChange}/>
          </div>
        );
        i++;
        continue;
      }
    }
    rendered.push(
      <FormField field={field} key={field.name} value={data[field.name]} onChange={onChange} />
    )
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground mb-2'>
        {step.description}
      </p>
      {error && (
        <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3'>
          {error}
        </div>
      )}
      {rendered}
    </div>
  )
}

export default FormSection
