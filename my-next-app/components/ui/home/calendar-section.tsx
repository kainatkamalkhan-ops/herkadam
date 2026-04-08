"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  OpportunityCard,
  type Opportunity,
} from "@/components/opportunities/opportunity-card"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function CalendarSection({
  opportunities,
}: {
  opportunities: Opportunity[]
}) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const deadlinesThisMonth = opportunities.filter((opp) => {
    const deadline = new Date(opp.deadline)
    return deadline.getMonth() === month && deadline.getFullYear() === year
  })

  const getDeadlinesForDay = (day: number) => {
    return deadlinesThisMonth.filter(opp => {
      const deadline = new Date(opp.deadline)
      return deadline.getDate() === day
    })
  }

  const selectedOpportunities = selectedDate 
    ? getDeadlinesForDay(selectedDate.getDate())
    : []

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
  }

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
  }

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && 
           selectedDate?.getMonth() === month && 
           selectedDate?.getFullYear() === year
  }

  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <Badge variant="secondary">Never Miss a Deadline</Badge>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deadline Calendar
          </h2>
          <p className="text-muted-foreground">
            Track application deadlines and plan your submissions. Click on a date to see opportunities due.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calendar */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="font-serif text-xl">
                  {MONTHS[month]} {year}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const deadlines = getDeadlinesForDay(day)
                  const hasDeadlines = deadlines.length > 0

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`
                        aspect-square rounded-lg flex flex-col items-center justify-center relative
                        transition-all hover:bg-muted
                        ${isToday(day) ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                        ${isSelected(day) && !isToday(day) ? "bg-accent/50 ring-2 ring-primary" : ""}
                        ${hasDeadlines && !isToday(day) ? "font-semibold" : ""}
                      `}
                    >
                      <span className="text-sm">{day}</span>
                      {hasDeadlines && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          {deadlines.slice(0, 3).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full ${isToday(day) ? "bg-primary-foreground" : "bg-primary"}`} 
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span>Has Deadlines</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Opportunities */}
          <div>
            <div className="sticky top-24">
              <h3 className="font-serif text-xl font-semibold mb-4">
                {selectedDate 
                  ? `Deadlines on ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                  : "Select a date to see deadlines"
                }
              </h3>

              {selectedDate ? (
                selectedOpportunities.length > 0 ? (
                  <div className="space-y-4">
                    {selectedOpportunities.map((opp) => (
                      <OpportunityCard key={opp.id} opportunity={opp} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No deadlines on this date.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select another date or browse all opportunities.
                      </p>
                    </CardContent>
                  </Card>
                )
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Click on a date in the calendar to view opportunities with deadlines on that day.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
