"use client"

import { motion } from "framer-motion"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

// Text Input Field
export function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  className = "",
  disabled = false,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
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
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500"
      />
    </motion.div>
  )
}

// Textarea Field
export function TextareaField({
  label,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  rows = 4,
  className = "",
  disabled = false,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500"
      />
    </motion.div>
  )
}

// Select Field
export function SelectField({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  )
}

// Radio Group
export function RadioGroup({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  className = "",
  disabled = false,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              required={required}
              className="w-4 h-4 text-[var(--village-green)] focus:ring-[var(--village-green)] border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Date Picker
export function DatePicker({
  label,
  name,
  required = false,
  value,
  onChange,
  className = "",
  disabled = false,
  minDate,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id={name}
            name={name}
            disabled={disabled}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500",
              !value && "text-gray-500",
            )}
          >
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => (minDate ? date < minDate : date < new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {required && !value && <input type="hidden" name={name} required />}
    </motion.div>
  )
}

// Date Range Picker
export function DateRangePicker({
  startLabel,
  endLabel,
  startName,
  endName,
  required = false,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = "",
  disabled = false,
}) {
  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {startLabel} {required && <span className="text-red-500">*</span>}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                id={startName}
                name={startName}
                disabled={disabled}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500",
                  !startDate && "text-gray-500",
                )}
              >
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                disabled={(date) => date < new Date() || (endDate && date > endDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {required && !startDate && <input type="hidden" name={startName} required />}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {endLabel} {required && <span className="text-red-500">*</span>}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                id={endName}
                name={endName}
                disabled={disabled || !startDate}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500",
                  !endDate && "text-gray-500",
                )}
              >
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                disabled={(date) => !startDate || date < startDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {required && !endDate && <input type="hidden" name={endName} required />}
        </div>
      </div>
    </motion.div>
  )
}

// Time Range Picker
export function TimeRangePicker({
  label,
  startName,
  endName,
  required = false,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  className = "",
  disabled = false,
}) {
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i
    return [
      { value: `${hour}:00`, label: `${hour}:00` },
      { value: `${hour}:30`, label: `${hour}:30` },
    ]
  }).flat()

  return (
    <motion.div
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                id={startName}
                name={startName}
                disabled={disabled}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500",
                  !startTime && "text-gray-500",
                )}
              >
                {startTime || <span>Start time</span>}
                <Clock className="ml-2 h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 max-h-[300px] overflow-y-auto">
              <div className="p-2">
                {timeOptions.map((time) => (
                  <button
                    key={time.value}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded-md hover:bg-gray-100",
                      startTime === time.value &&
                        "bg-[var(--village-green)] text-white hover:bg-[var(--village-green)]",
                    )}
                    onClick={() => onStartTimeChange(time.value)}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {required && !startTime && <input type="hidden" name={startName} required />}
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                id={endName}
                name={endName}
                disabled={disabled || !startTime}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--village-green)] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-500",
                  !endTime && "text-gray-500",
                )}
              >
                {endTime || <span>End time</span>}
                <Clock className="ml-2 h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 max-h-[300px] overflow-y-auto">
              <div className="p-2">
                {timeOptions
                  .filter((time) => {
                    if (!startTime) return true
                    const [startHour, startMinute] = startTime.split(":").map(Number)
                    const [timeHour, timeMinute] = time.value.split(":").map(Number)
                    return timeHour > startHour || (timeHour === startHour && timeMinute > startMinute)
                  })
                  .map((time) => (
                    <button
                      key={time.value}
                      className={cn(
                        "w-full text-left px-2 py-1 rounded-md hover:bg-gray-100",
                        endTime === time.value &&
                          "bg-[var(--village-green)] text-white hover:bg-[var(--village-green)]",
                      )}
                      onClick={() => onEndTimeChange(time.value)}
                    >
                      {time.label}
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
          {required && !endTime && <input type="hidden" name={endName} required />}
        </div>
      </div>
    </motion.div>
  )
}

// Submit Button
export function SubmitButton({ text, isLoading = false, className = "" }) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 px-4 bg-[var(--village-green)] text-white font-medium rounded-md hover:bg-[var(--village-green)]/90 transition-colors disabled:opacity-70 flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </motion.button>
  )
}
