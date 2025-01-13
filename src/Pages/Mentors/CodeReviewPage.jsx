import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Loader } from "lucide-react";

// Mock Firebase auth - Replace with actual Firebase implementation
const auth = {
  currentUser: {
    displayName: "John Doe",
    email: "john@example.com",
    photoURL: "https://example.com/photo.jpg"
  }
};

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock fetching data - Replace with actual Firebase/API call
    const fetchSubmissions = async () => {
      try {
        // Simulate API call
        const mockData = [
          {
            id: '1',
            student_id: 'STU001',
            submission_date: '2024-01-12',
            code_url: 'https://s3-bucket.example/code1',
            status: 'pending'
          },
          {
            id: '2',
            student_id: 'STU002',
            submission_date: '2024-01-11',
            code_url: 'https://s3-bucket.example/code2',
            status: 'pending'
          }
        ];
        setSubmissions(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch submissions');
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Student ID</th>
                <th className="text-left p-4">Submission Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{submission.student_id}</td>
                  <td className="p-4">{submission.submission_date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {submission.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(submission.code_url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/review/${submission.id}`)}
                      >
                        Add Review
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewSubmissionPage = () => {
  const [review, setReview] = useState('');
  const [score, setScore] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Mock API call - Replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit Review</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="mb-4">
              <AlertDescription>Review submitted successfully!</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmitReview}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Score (0-100)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Review Comments
                  </label>
                  <Textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={6}
                    required
                    placeholder="Enter your detailed review here..."
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function MentorReviewSystem() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {auth.currentUser.displayName}</h1>
        <SubmissionTable />
      </div>
    </div>
  );
}