"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react"

export default function ProgramReviews({ programId }) {
  const [reviewFilter, setReviewFilter] = useState("all")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  // In a real application, you would fetch reviews from an API
  const reviews = [
    {
      id: 1,
      author: {
        name: "Kwame Mensah",
        avatar: "/placeholder.svg?height=100&width=100&query=african%20man%20professional",
        location: "Accra, Ghana",
      },
      rating: 5,
      date: "March 15, 2025",
      content:
        "This program exceeded my expectations. The instructors were knowledgeable and the content was well-structured. I've been able to apply what I learned to my job immediately.",
      helpful: 12,
      replies: 2,
    },
    {
      id: 2,
      author: {
        name: "Amina Diallo",
        avatar: "/placeholder.svg?height=100&width=100&query=african%20woman%20professional",
        location: "Dakar, Senegal",
      },
      rating: 4,
      date: "February 28, 2025",
      content:
        "Great introduction to AI concepts. The practical exercises were particularly helpful. I would have liked more advanced content towards the end of the program.",
      helpful: 8,
      replies: 1,
    },
    {
      id: 3,
      author: {
        name: "Tunde Okafor",
        avatar: "/placeholder.svg?height=100&width=100&query=african%20man%20student",
        location: "Lagos, Nigeria",
      },
      rating: 5,
      date: "January 20, 2025",
      content:
        "As someone with no prior experience in AI, this program provided an excellent foundation. The instructors were patient and explained complex concepts in an accessible way.",
      helpful: 15,
      replies: 0,
    },
    {
      id: 4,
      author: {
        name: "Fatima Abdi",
        avatar: "/placeholder.svg?height=100&width=100&query=african%20woman%20student",
        location: "Nairobi, Kenya",
      },
      rating: 3,
      date: "December 10, 2024",
      content:
        "The content was good, but I found the pace a bit slow. Some of the assignments could have been more challenging. The community support was excellent though.",
      helpful: 5,
      replies: 3,
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    if (reviewFilter === "all") return true
    if (reviewFilter === "positive") return review.rating >= 4
    if (reviewFilter === "critical") return review.rating <= 3
    return true
  })

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // In a real application, you would submit the review to an API
    console.log("Submitting review:", { rating, reviewText })
    setShowReviewForm(false)
    setReviewText("")
    setRating(0)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Reviews</h2>
          <p className="text-muted-foreground">See what our students are saying about this program</p>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview}>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 font-medium">Your Rating</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoveredRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 font-medium">Your Review</div>
                  <Textarea
                    placeholder="Share your experience with this program..."
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={rating === 0 || !reviewText.trim()}>
                  Submit Review
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
                <div className="mt-2 flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
              </div>

              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-8 text-right">{rating}</div>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(ratingCounts[index] / reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-muted-foreground">{ratingCounts[index]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <Tabs value={reviewFilter} onValueChange={setReviewFilter}>
              <TabsList>
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Sort
            </Button>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.author.avatar || "/placeholder.svg"} alt={review.author.name} />
                        <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{review.author.name}</div>
                            <div className="text-sm text-muted-foreground">{review.author.location}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="mt-1 flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-4">{review.content}</p>
                        <div className="mt-4 flex gap-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp className="h-4 w-4" /> Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" /> Reply ({review.replies})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No reviews match your filter criteria.</p>
              </CardContent>
            </Card>
          )}

          {filteredReviews.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
