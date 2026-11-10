import { z } from 'zod'
import { cloudinaryUrl, optionalEmail, optionalText, recaptchaToken, text } from './common'

const optionalDocument = z
  .union([z.literal(''), z.null(), cloudinaryUrl])
  .optional()
  .transform((value) => value || undefined)

/**
 * Public admission application. `status`, `notes`, timestamps and ids are not
 * accepted from applicants; the server sets them.
 */
export const createAdmissionSchema = z
  .object({
    branch: text(100),
    academicYear: text(50),
    classAppliedFor: text(50),

    surname: text(100),
    studentName: text(100),
    dateOfBirth: text(50),
    gender: text(20),
    nationality: text(100),

    presentAddress: text(500),
    permanentAddress: text(500),

    fatherName: text(100),
    fatherContact: text(50),
    fatherEmail: optionalEmail,
    motherName: text(100),
    motherContact: text(50),
    motherEmail: optionalEmail,

    onMedication: z.boolean().default(false),
    medicationName: optionalText(200),

    paymentReference: text(100),

    studentPhoto: optionalDocument,
    birthCertificateImage: optionalDocument,
    lastYearReportCardImage: optionalDocument,
    passportImage: optionalDocument,
    visitingCardImage: optionalDocument,

    recaptchaToken
  })
  .transform((data) => ({
    ...data,
    medicationName: data.onMedication ? data.medicationName : undefined
  }))

/** Admin review: only status and notes can change. */
export const updateAdmissionSchema = z
  .object({
    status: z.enum(['pending', 'approved', 'rejected']),
    notes: z.union([z.null(), z.string().trim().max(5_000)]).transform((value) => value ?? '')
  })
  .partial()
  .refine((data) => data.status !== undefined || data.notes !== undefined, 'Nothing to update')

export const admissionStatusParam = z.enum(['pending', 'approved', 'rejected'])
