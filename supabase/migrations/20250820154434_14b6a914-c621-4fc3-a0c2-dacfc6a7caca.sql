-- Disable RLS on all relevant tables for now (as requested)
ALTER TABLE public."Projects" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."Devices" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."Frames" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."Detections" DISABLE ROW LEVEL SECURITY;
ALTER TABLE public."Measurements" DISABLE ROW LEVEL SECURITY;