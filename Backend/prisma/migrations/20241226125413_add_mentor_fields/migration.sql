-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "company" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "resumeLink" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'mentor';
