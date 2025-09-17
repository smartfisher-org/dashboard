-- Fix RLS security issues by enabling RLS on all tables

-- Enable Row Level Security on all tables
ALTER TABLE public."Projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Devices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Frames" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Detections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Measurements" ENABLE ROW LEVEL SECURITY;