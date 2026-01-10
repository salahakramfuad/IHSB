'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import Button from '@/components/ui/Button'
import { AdmissionDocument } from '@/lib/firestore/admissions'
import Image from 'next/image'

export default function AdmissionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const admissionId = params.id as string
  
  const [admission, setAdmission] = useState<AdmissionDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchAdmission()
  }, [admissionId])

  const fetchAdmission = async () => {
    try {
      const response = await fetch(`/api/admissions/${admissionId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch admission')
      }

      setAdmission(data.admission)
      setStatus(data.admission.status)
      setNotes(data.admission.notes || '')
    } catch (error) {
      // Error handled by null check below
      setAdmission(null)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    setUpdating(true)
    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/admissions/${admissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, notes })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      setAdmission({ ...admission!, status, notes })
      alert('Status updated successfully')
    } catch (error) {
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const getAuthToken = async () => {
    const { auth } = await import('@/lib/firebase/config')
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    return user.getIdToken()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:pl-64 p-6 lg:p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admission details...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!admission) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:pl-64 p-6 lg:p-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Admission not found</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="lg:ml-64 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Button variant="outline" onClick={() => router.back()} className="mb-4">
              ← Back to Admissions
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admission Application Details
            </h1>
            <p className="text-gray-600">Application #{admission.applicationNumber}</p>
          </div>

          <div className="space-y-6">
            {/* Status Update Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    placeholder="Add any notes about this application..."
                  />
                </div>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={updating}
                  variant="primary"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>

            {/* Student Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-gray-900">{admission.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Surname</label>
                  <p className="text-gray-900">{admission.surname}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-gray-900">{admission.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-gray-900">{admission.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nationality</label>
                  <p className="text-gray-900">{admission.nationality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Class Applied For</label>
                  <p className="text-gray-900">{admission.classAppliedFor}</p>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Father's Name</label>
                  <p className="text-gray-900">{admission.fatherName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Father's Contact</label>
                  <p className="text-gray-900">{admission.fatherContact}</p>
                </div>
                {admission.fatherEmail && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Father's Email</label>
                    <p className="text-gray-900">{admission.fatherEmail}</p>
                  </div>
                )}
                {admission.motherName && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Mother's Name</label>
                    <p className="text-gray-900">{admission.motherName}</p>
                  </div>
                )}
                {admission.motherContact && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Mother's Contact</label>
                    <p className="text-gray-900">{admission.motherContact}</p>
                  </div>
                )}
                {admission.motherEmail && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Mother's Email</label>
                    <p className="text-gray-900">{admission.motherEmail}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Present Address</label>
                  <p className="text-gray-900">{admission.presentAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Permanent Address</label>
                  <p className="text-gray-900">{admission.permanentAddress}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {admission.studentPhoto && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Student Photo</label>
                    <div className="relative h-32 w-full border rounded-lg overflow-hidden">
                      <Image src={admission.studentPhoto} alt="Student Photo" fill className="object-cover" />
                    </div>
                  </div>
                )}
                {admission.birthCertificateImage && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Birth Certificate</label>
                    <div className="relative h-32 w-full border rounded-lg overflow-hidden">
                      <Image src={admission.birthCertificateImage} alt="Birth Certificate" fill className="object-cover" />
                    </div>
                  </div>
                )}
                {admission.lastYearReportCardImage && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Report Card</label>
                    <div className="relative h-32 w-full border rounded-lg overflow-hidden">
                      <Image src={admission.lastYearReportCardImage} alt="Report Card" fill className="object-cover" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">On Medication</label>
                  <p className="text-gray-900">{admission.onMedication ? 'Yes' : 'No'}</p>
                </div>
                {admission.onMedication && admission.medicationName && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Medication Name</label>
                    <p className="text-gray-900">{admission.medicationName}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Reference</label>
                  <p className="text-gray-900">{admission.paymentReference}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
