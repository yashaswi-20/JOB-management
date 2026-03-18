#!/bin/bash

# ─────────────────────────────────────────────
# JOB Portal — API Test Script (No jq required)
# ─────────────────────────────────────────────

BASE="http://localhost:3000/api/v1"
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

pass() { echo -e "${GREEN}✔ $1${NC}"; }
fail() { echo -e "${RED}✘ $1${NC}"; }
section() { echo -e "\n${CYAN}─── $1 ───────────────────────────────────${NC}"; }

# Generate unique emails to avoid "User already exists"
RND=$RANDOM
STUDENT_EMAIL="student${RND}@gmail.com"
RECRUITER_EMAIL="recruiter${RND}@gmail.com"

# ─── USER ────────────────────────────────────
section "Register Users"

RES=$(curl -s -X POST "$BASE/user/register" -H "Content-Type: application/json" \
  -d "{\"fullname\":\"Student $RND\",\"email\":\"$STUDENT_EMAIL\",\"password\":\"Test@1234\",\"phoneNumber\":\"9876543210\",\"role\":\"Student\"}")
echo "$RES" | grep -q "successfully" && pass "Student registered ($STUDENT_EMAIL)" || fail "Student register: $RES"

RES=$(curl -s -X POST "$BASE/user/register" -H "Content-Type: application/json" \
  -d "{\"fullname\":\"Recruiter $RND\",\"email\":\"$RECRUITER_EMAIL\",\"password\":\"Test@1234\",\"phoneNumber\":\"9876543211\",\"role\":\"Recruiter\"}")
echo "$RES" | grep -q "successfully" && pass "Recruiter registered ($RECRUITER_EMAIL)" || fail "Recruiter register: $RES"

# ─── LOGIN ───────────────────────────────────
section "Login"

RES=$(curl -s -X POST "$BASE/user/login" -H "Content-Type: application/json" -c student_cookie.txt \
  -d "{\"email\":\"$STUDENT_EMAIL\",\"password\":\"Test@1234\",\"role\":\"Student\"}")
echo "$RES" | grep -q "Welcome" && pass "Student logged in" || fail "Student login: $RES"

RES=$(curl -s -X POST "$BASE/user/login" -H "Content-Type: application/json" -c recruiter_cookie.txt \
  -d "{\"email\":\"$RECRUITER_EMAIL\",\"password\":\"Test@1234\",\"role\":\"Recruiter\"}")
echo "$RES" | grep -q "Welcome" && pass "Recruiter logged in" || fail "Recruiter login: $RES"

# ─── UPDATE PROFILE ──────────────────────────
section "Update Profile"
RES=$(curl -s -X POST "$BASE/user/profile/update" -H "Content-Type: application/json" -b student_cookie.txt \
  -d '{"fullname":"Student Updated","bio":"Full Stack Dev","skills":"React,Node.js,MongoDB"}')
echo "$RES" | grep -q "successfully" && pass "Profile updated" || fail "Profile update: $RES"

# ─── COMPANY ─────────────────────────────────
section "Company"
RES=$(curl -s -X POST "$BASE/company/register" -H "Content-Type: application/json" -b recruiter_cookie.txt \
  -d "{\"companyName\":\"TechCorp $RND\"}")
COMPANY_ID=$(echo "$RES" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).company?._id || '')")
if [ -n "$COMPANY_ID" ]; then pass "Company registered → ID: $COMPANY_ID"; else fail "Company register: $RES"; fi

RES=$(curl -s "$BASE/company/get" -b recruiter_cookie.txt)
echo "$RES" | grep -q "TechCorp" && pass "Get my companies" || fail "Get companies: $RES"

RES=$(curl -s "$BASE/company/get/$COMPANY_ID" -b recruiter_cookie.txt)
echo "$RES" | grep -q "TechCorp" && pass "Get company by ID" || fail "Get company by ID: $RES"

RES=$(curl -s -X PUT "$BASE/company/update/$COMPANY_ID" -b recruiter_cookie.txt \
  -F "name=TechCorp $RND updated" -F "description=A great tech company" -F "website=https://techcorp.in" -F "location=Bangalore")
echo "$RES" | grep -q "successfully" && pass "Company updated" || fail "Company update: $RES"

# ─── JOBS ────────────────────────────────────
section "Jobs"
RES=$(curl -s -X POST "$BASE/job/post" -H "Content-Type: application/json" -b recruiter_cookie.txt \
  -d "{\"title\":\"Backend Developer\",\"description\":\"Node.js and Express required\",\"requirements\":\"Node.js,Express,MongoDB\",\"salary\":\"800000\",\"location\":\"Remote\",\"jobType\":\"Full-Time\",\"position\":2,\"experienceYear\":1,\"companyId\":\"$COMPANY_ID\"}")
JOB_ID=$(echo "$RES" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).job?._id || '')")
if [ -n "$JOB_ID" ]; then pass "Job posted → ID: $JOB_ID"; else fail "Post job: $RES"; fi

RES=$(curl -s "$BASE/job/get?keyword=backend" -b student_cookie.txt)
echo "$RES" | grep -q "Backend" && pass "Get all jobs (keyword=backend)" || fail "Get all jobs: $RES"

RES=$(curl -s "$BASE/job/get/$JOB_ID" -b student_cookie.txt)
echo "$RES" | grep -q "Backend" && pass "Get job by ID" || fail "Get job by ID: $RES"

RES=$(curl -s "$BASE/job/getadminjobs" -b recruiter_cookie.txt)
echo "$RES" | grep -q "Backend" && pass "Get admin jobs" || fail "Get admin jobs: $RES"

# ─── APPLICATIONS ────────────────────────────
section "Applications"
RES=$(curl -s -X POST "$BASE/application/apply/$JOB_ID" -b student_cookie.txt)
APP_ID=$(echo "$RES" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).application?._id || '')")
if [ -n "$APP_ID" ]; then pass "Applied for job → Application ID: $APP_ID"; else fail "Apply job: $RES"; fi

RES=$(curl -s -X POST "$BASE/application/apply/$JOB_ID" -b student_cookie.txt)
echo "$RES" | grep -q "already applied" && pass "Duplicate apply blocked correctly" || fail "Duplicate check: $RES"

RES=$(curl -s "$BASE/application/getjobs" -b student_cookie.txt)
echo "$RES" | grep -q "applications" && pass "Get applied jobs" || fail "Get applied jobs: $RES"

RES=$(curl -s "$BASE/application/getapplicants/$JOB_ID" -b recruiter_cookie.txt)
echo "$RES" | grep -q "applications" && pass "Get applicants for job" || fail "Get applicants: $RES"

RES=$(curl -s -X POST "$BASE/application/update/$APP_ID" -H "Content-Type: application/json" -b recruiter_cookie.txt \
  -d '{"status":"Accepted"}')
echo "$RES" | grep -q "successfully" && pass "Application status → Accepted" || fail "Update status: $RES"

RES=$(curl -s -X POST "$BASE/application/update/$APP_ID" -H "Content-Type: application/json" -b recruiter_cookie.txt \
  -d '{"status":"Rejected"}')
echo "$RES" | grep -q "successfully" && pass "Application status → Rejected" || fail "Update status: $RES"

# ─── LOGOUT ──────────────────────────────────
section "Logout"
RES=$(curl -s "$BASE/user/logout" -b student_cookie.txt)
echo "$RES" | grep -q "successfully" && pass "Student logged out" || fail "Logout: $RES"

rm -f student_cookie.txt recruiter_cookie.txt
echo -e "\n${CYAN}Done! Cookie files cleaned up.${NC}\n"
