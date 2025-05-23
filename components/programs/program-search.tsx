"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import Link from "next/link"

export default function ProgramSearch({ programs }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        const results = programs.filter(
          (program) =>
            program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.audience.some((audience) => audience.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, programs])

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search programs, topics, or skills..."
          className="pl-10 pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {searchTerm.length > 2 && (
        <Card className="absolute z-10 mt-1 w-full overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
            ) : searchResults.length > 0 ? (
              <ul className="max-h-[400px] overflow-auto">
                {searchResults.map((program) => (
                  <li key={program.id} className="border-b last:border-0">
                    <Link
                      href={`/programs/${program.id}`}
                      className="block p-3 transition-colors hover:bg-muted/50"
                      onClick={() => setSearchTerm("")}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{program.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{program.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {program.type}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {program.level}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {program.duration}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No programs found matching "{searchTerm}"
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
