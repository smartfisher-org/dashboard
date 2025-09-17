-- Enable SELECT policies for dashboard data access (fixing case-sensitive table names)

-- Projects table: Allow reading projects for SmartFISHER client
CREATE POLICY "Allow read access to SmartFISHER projects" 
ON public."Projects" 
FOR SELECT 
USING (client = 'SmartFISHER');

-- Devices table: Allow reading devices
CREATE POLICY "Allow read access to devices" 
ON public."Devices" 
FOR SELECT 
USING (true);

-- Frames table: Allow reading frames
CREATE POLICY "Allow read access to frames" 
ON public."Frames" 
FOR SELECT 
USING (true);

-- Detections table: Allow reading detections
CREATE POLICY "Allow read access to detections" 
ON public."Detections" 
FOR SELECT 
USING (true);

-- Measurements table: Allow reading measurements
CREATE POLICY "Allow read access to measurements" 
ON public."Measurements" 
FOR SELECT 
USING (true);

-- Add proper foreign key relationships for data integrity
ALTER TABLE public."Devices" 
ADD CONSTRAINT fk_devices_project_id 
FOREIGN KEY (project_id) REFERENCES public."Projects"(id) ON DELETE CASCADE;

ALTER TABLE public."Frames" 
ADD CONSTRAINT fk_frames_project_id 
FOREIGN KEY (project_id) REFERENCES public."Projects"(id) ON DELETE CASCADE;

ALTER TABLE public."Frames" 
ADD CONSTRAINT fk_frames_device_id 
FOREIGN KEY (device_id) REFERENCES public."Devices"(id) ON DELETE CASCADE;

ALTER TABLE public."Detections" 
ADD CONSTRAINT fk_detections_frame_id 
FOREIGN KEY (frame_id) REFERENCES public."Frames"(id) ON DELETE CASCADE;

ALTER TABLE public."Measurements" 
ADD CONSTRAINT fk_measurements_detection_id 
FOREIGN KEY (detection_id) REFERENCES public."Detections"(id) ON DELETE CASCADE;