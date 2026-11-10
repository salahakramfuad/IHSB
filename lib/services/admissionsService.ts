import { getAdmissionById, getAllAdmissions } from '../database/admissions'
import type { AdmissionDocument } from '../database/admissions'
import { dateToMillis } from '../database/shared'
import { mockAdmissions } from '../mock/data'
import { fromSource } from './source'

export type { AdmissionDocument } from '../database/admissions'

/**
 * Admissions are personal data: these functions are only called from
 * admin-guarded API routes, never from public pages.
 */
export async function getAllAdmissionsService(): Promise<AdmissionDocument[]> {
  return fromSource('admissions.all', {
    real: getAllAdmissions,
    mock: () => [...mockAdmissions].sort((a, b) => dateToMillis(b.createdAt) - dateToMillis(a.createdAt)),
    empty: []
  })
}

export async function getAdmissionsByStatusService(status: AdmissionDocument['status']): Promise<AdmissionDocument[]> {
  return (await getAllAdmissionsService()).filter((admission) => admission.status === status)
}

export async function getAdmissionByIdService(id: string): Promise<AdmissionDocument | null> {
  return fromSource('admissions.byId', {
    real: () => getAdmissionById(id),
    mock: () => mockAdmissions.find((admission) => admission.id === id) ?? null,
    empty: null
  })
}
