"use client"

import React, { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Text input component
interface TextInputProps {
  label: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({ label, name, type, placeholder, required, value, onChange }: TextInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--village-teal)] focus:border-transparent"
      />
    </div>
  )
}

// Textarea field component
interface TextareaFieldProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextareaField({ label, name, placeholder, required, value, onChange }: TextareaFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--village-teal)] focus:border-transparent"
      />
    </div>
  )
}

// Select field component
interface SelectFieldProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function SelectField({ label, name, options, placeholder, required, value, onChange }: SelectFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--village-teal)] focus:border-transparent bg-white"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Date picker component
interface DatePickerProps {
  label: string
  name: string
  required?: boolean
  value: Date | null
  onChange: (date: Date | null) => void
}

export function DatePicker({ label, name, required, value, onChange }: DatePickerProps) {
  const handleDateSelect = (date: Date | undefined) => {
    onChange(date || null)
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Time range picker component
interface TimeRangePickerProps {
  label: string
  startName: string
  endName: string
  required?: boolean
  startTime: string
  endTime: string
  onStartTimeChange: (time: string) => void
  onEndTimeChange: (time: string) => void
}

export function TimeRangePicker({
  label,
  startName,
  endName,
  required,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeRangePickerProps) {
  const timeOptions = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ]

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <select
            id={startName}
            name={startName}
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            required={required}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--village-teal)] focus:border-transparent bg-white"
          >
            <option value="">Start time</option>
            {timeOptions.map((time) => (
              <option key={`start-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <span className="text-gray-400">—</span>
        <div className="flex-1">
          <select
            id={endName}
            name={endName}
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            required={required}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--village-teal)] focus:border-transparent bg-white"
          >
            <option value="">End time</option>
            {timeOptions.map((time) => (
              <option key={`end-${time}`} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

// Submit button component
interface SubmitButtonProps {
  text: string
  isLoading?: boolean
}

export function SubmitButton({ text, isLoading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[var(--village-green)] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span className="ml-2">Submitting...</span>
        </div>
      ) : (
        text
      )}
    </button>
  )
} 