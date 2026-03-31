import { useState, useEffect, useMemo, useRef } from 'react';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  ScreenShare, 
  Users, 
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

// --- TYPES ---
interface ZerionMeetingRoomProps {
  token: string;
  meetingId: string;
  setMeetingId?: (id: string) => void;
  onLeave: () => void;
  onEndWithTranscript?: (text: string) => void;
  userName?: string;
}

// --- COMPONENTS ---

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { webcamStream, webcamOn, displayName } = useParticipant(participantId);

  useEffect(() => {
    if (videoRef.current && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch((err) => console.error("videoElem.current.play() failed", err));
    }
  }, [webcamStream]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
    >
      {webcamOn ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
        />
      ) : (
        <div className="flex-center" style={{ width: '100%', height: '100%', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            opacity: 0.1,
            position: 'absolute'
          }} />
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,140,0,0.1)',
            border: '2px solid var(--primary)'
          }} className="flex-center">
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{displayName[0].toUpperCase()}</span>
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Camera Off</span>
        </div>
      )}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        background: 'rgba(0,0,0,0.6)',
        padding: '0.6rem 1.2rem',
        borderRadius: '30px',
        fontSize: '0.85rem',
        fontWeight: 600,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: webcamOn ? '#44ff44' : '#ff4444' }} />
        {displayName}
      </div>
    </motion.div>
  );
};

const Controls = ({ onLeave, onEndWithTranscript, fullTranscript }: { onLeave: () => void, onEndWithTranscript?: (t: string) => void, fullTranscript: string }) => {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare, localMicOn, localWebcamOn } = useMeeting();

  const handleEnd = () => {
    leave();
    if (onEndWithTranscript && fullTranscript.length > 10) {
      onEndWithTranscript(fullTranscript);
    } else {
      onLeave();
    }
  };

  return (
    <div className="flex-center" style={{ gap: '1.2rem', padding: '1.2rem 2rem', background: 'rgba(15,15,15,0.8)', backdropFilter: 'blur(30px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', margin: '1rem auto', width: 'fit-content', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <button
        className={`btn ${localMicOn ? 'btn-outline' : 'btn-danger'}`}
        onClick={() => toggleMic()}
        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, transition: 'all 0.3s ease' }}
      >
        {localMicOn ? <Mic size={20} /> : <MicOff size={20} />}
      </button>

      <button
        className={`btn ${localWebcamOn ? 'btn-outline' : 'btn-danger'}`}
        onClick={() => toggleWebcam()}
        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, transition: 'all 0.3s ease' }}
      >
        {localWebcamOn ? <Video size={20} /> : <VideoOff size={20} />}
      </button>

      <button
        className="btn btn-outline"
        onClick={() => toggleScreenShare()}
        style={{ borderRadius: '50%', width: 50, height: 50, padding: 0, transition: 'all 0.3s ease' }}
      >
        <ScreenShare size={20} />
      </button>

      <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />

      <button
        className="btn btn-primary"
        style={{ borderRadius: '30px', padding: '0 1.5rem', height: 50, background: 'linear-gradient(90deg, #ff4444, #cc0000)', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
        onClick={handleEnd}
      >
        <PhoneOff size={18} />
        End & Analyze
      </button>
    </div>
  );
};

const TranscriptPanel = ({ transcripts }: { transcripts: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts]);

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid var(--glass-border)', background: 'linear-gradient(180deg, rgba(0,0,0,0.2), transparent)' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(255, 140, 0, 0.1)', padding: '8px', borderRadius: '10px' }}>
          <Sparkles size={18} className="text-primary" />
        </div>
        <h4 style={{ margin: 0 }}>Live Intelligence</h4>
      </div>
      <div
        ref={scrollRef}
        style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {transcripts.length === 0 ? (
          <div className="flex-center" style={{ height: '100%', flexDirection: 'column', opacity: 0.4, textAlign: 'center' }}>
            <Zap size={32} style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.85rem' }}>Transcribing your <br/>conversation in real-time...</p>
          </div>
        ) : (
          transcripts.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', lineHeight: '1.5' }}
            >
              {t}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const MeetingView = ({ onLeave, onEndWithTranscript }: { onLeave: () => void, onEndWithTranscript?: (t: string) => void }) => {
  const [joined, setJoined] = useState<"JOINING" | "JOINED" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string>("Checking hardware...");
  const [liveTranscripts, setLiveTranscripts] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      console.log("✅ VideoSDK: Joined meeting successfully");
      setJoined("JOINED");
      startTranscription();
    },
    onMeetingLeft: () => {
      console.log("ℹ️ VideoSDK: Left meeting");
      stopTranscription();
      onLeave();
    },
    onError: (error: any) => {
      console.error("❌ VideoSDK Error:", error);
      setErrorMsg(`Connection Error: ${error?.message || "Check your Token and Room ID"}`);
      setJoined(null);
    },
  });

  const startTranscription = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        if (transcript.trim()) {
          setLiveTranscripts(prev => [...prev, transcript]);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
      };

      recognitionRef.current.start();
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Hardware check
  useEffect(() => {
    async function checkHardware() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCam = devices.some(d => d.kind === 'videoinput');
        const hasMic = devices.some(d => d.kind === 'audioinput');
        setPermissionStatus(hasCam || hasMic ? "Hardware ready." : "No camera or microphone found.");
      } catch (err) {
        setPermissionStatus("Unable to access media devices.");
      }
    }
    checkHardware();
  }, []);

  const participantIds = useMemo(() => Array.from(participants.keys()), [participants]);
  const fullTranscript = liveTranscripts.join(". ");

  return (
    <div className="container" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
      {joined !== "JOINED" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-center"
          style={{ flex: 1, flexDirection: 'column', gap: '2rem' }}
        >
          <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', maxWidth: '500px', borderRadius: '32px' }}>
            <div style={{ background: 'rgba(255, 140, 0, 0.1)', width: 80, height: 80, borderRadius: '24px', margin: '0 auto 2rem' }} className="flex-center">
               <Video size={40} className="text-primary" />
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Enter the <span className="gradient-text">Studio</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Zerion is ready to capture your meeting intelligence.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '2.5rem', fontWeight: 600 }}>{permissionStatus}</p>

            {errorMsg && (
              <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', borderRadius: '16px', marginBottom: '2rem', fontSize: '0.9rem', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
                {errorMsg}
              </div>
            )}

            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '1.5rem', borderRadius: '20px', fontSize: '1.1rem' }}
              onClick={async () => {
                try {
                  await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                  setJoined("JOINING");
                  setErrorMsg(null);
                  join();
                } catch (err: any) {
                  setJoined("JOINING");
                  join();
                }
              }}
              disabled={joined === "JOINING"}
            >
              {joined === "JOINING" ? "Connecting to Zero-Latency Stream..." : "Join Intelligent Meeting"}
            </button>
          </div>
        </motion.div>
      ) : (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', margin: '1rem 0' }}>

          {/* Main Stage */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div className="flex-center" style={{ gap: '1rem' }}>
                <div style={{ background: 'rgba(255, 140, 0, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Users size={20} className="text-primary" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Meeting Room</h3>
                  <div className="flex-center" style={{ gap: '8px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <div className="pulse" /> Live Stream • {participantIds.length} Participants
                  </div>
                </div>
              </div>
              <div className="flex-center" style={{ gap: '1rem' }}>
                 <div className="flex-center" style={{ background: 'rgba(255,68,68,0.1)', padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(255,68,68,0.2)', gap: '0.8rem' }}>
                   <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4444' }} />
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff4444' }}>INTEL CAPTURE ACTIVE</span>
                 </div>
              </div>
            </div>

            {/* Grid */}
            <div style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: participantIds.length > 2 ? 'repeat(auto-fit, minmax(400px, 1fr))' : participantIds.length === 2 ? '1fr 1fr' : '1fr',
              gap: '1.5rem',
              alignContent: 'center'
            }}>
              {participantIds.map((id) => (
                <ParticipantView key={id} participantId={id} />
              ))}
            </div>

            {/* Controls */}
            <Controls onLeave={onLeave} onEndWithTranscript={onEndWithTranscript} fullTranscript={fullTranscript} />
          </div>

          {/* Sidebar */}
          <TranscriptPanel transcripts={liveTranscripts} />

          <style>{`
            .pulse {
              width: 8px;
              height: 8px;
              background: #ff4444;
              border-radius: 50%;
              animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            }
            @keyframes pulse-ring {
              0% { transform: scale(.33); }
              80%, 100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export const ZerionMeetingRoom = ({ token, meetingId, setMeetingId, onLeave, onEndWithTranscript, userName }: ZerionMeetingRoomProps) => {
  const [inputCode, setInputCode] = useState("");

  if (!token || !meetingId) {
    return (
      <div className="container flex-center" style={{ height: '60vh' }}>
        <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', borderRadius: '32px', maxWidth: '500px' }}>
          {!token ? (
            <>
              <Shield size={48} className="text-primary" style={{ marginBottom: '1.8rem' }} />
              <h2 style={{ marginBottom: '1rem' }}>Security Configuration</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>A valid VideoSDK Token is required to establish an encrypted session. Please check your settings.</p>
              <button className="btn btn-primary" style={{ padding: '1.2rem 2.5rem' }} onClick={onLeave}>Return to Home</button>
            </>
          ) : (
            <>
              <Zap size={48} className="text-primary" style={{ marginBottom: '1.8rem' }} />
              <h2 style={{ marginBottom: '1rem' }}>Enter Room Code</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>The VideoSDK engine is ready. Enter your room ID below to join the session.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <input
                    className="input-field"
                    style={{ flex: 1, textAlign: 'center', letterSpacing: '1px', fontSize: '1.1rem' }}
                    placeholder="e.g. xyz-abc-123"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ padding: '0 2.5rem' }}
                    onClick={() => setMeetingId?.(inputCode)}
                    disabled={!inputCode.trim()}
                  >
                    Join Room
                  </button>
                </div>
                
                <button className="btn-link" style={{ marginTop: '1rem' }} onClick={onLeave}>
                  Cancel and Return to Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: userName || "Zerion Guest",
        debugMode: false,
      }}
      token={token}
    >
      <MeetingView onLeave={onLeave} onEndWithTranscript={onEndWithTranscript} />
    </MeetingProvider>
  );
};
