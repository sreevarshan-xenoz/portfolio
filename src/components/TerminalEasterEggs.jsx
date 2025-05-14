import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalEasterEggs = () => {
  const [commands, setCommands] = useState([
    { text: '$ neofetch', output: 'OS: Arch Linux x86_64\nKernel: 6.1.0-arch1\nShell: zsh 5.9\nWM: Hyprland\nTheme: Nord\nIcons: Papirus' },
    { text: '$ ls projects/', output: 'iris-os/  genesis-ai/  echolink/  smart-gym-glasses/  humanoid-robot/' },
    { text: '$ cat skills.txt', output: 'Python | C | Rust | Ethical Hacking | AI/ML | Robotics' },
    { text: '$ whoami', output: 'sreevarshan - Student | Ethical Hacker | AI Dev | Fantasy World Architect' }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [easterEggFound, setEasterEggFound] = useState(false);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Regular command handlers
  const availableCommands = {
    help: 'Available commands: help, clear, projects, skills, about, contact, ls, cat, echo, cd, pwd, date, neofetch, sudo, rm, exit',
    clear: 'Clearing terminal...',
    projects: 'My Projects:\n• IRIS OS – Custom Linux OS with built-in AI voice assistant\n• Genisis AI – Your all-in-one modular AI system\n• EchoLink – Offline-first mobile comms app\n• Smart Gym Glasses – Wearables that recognize food & show real-time calorie data\n• Semi-Humanoid Robot – AI brain + custom tracked base',
    skills: 'Technical Skills:\n• Programming: Python, C, Rust, Kotlin\n• AI/ML: LLMs, Qwen integration, GPT APIs, custom AI agents\n• Cybersecurity: Ethical hacking, network forensics, Wi-Fi spoofing\n• DevOps: Arch Linux, Hyprland WM, Zsh, Custom OS development',
    about: `About Me:
Future-focused tech nerd building bleeding-edge AI systems, operating systems, and semi-humanoid robots. I thrive in hackathons, chaos, and caffeine. Currently building "Iris" — a custom Arch Linux-based OS with integrated offline/online AI. I bend systems to my will, and I don't believe in limits.`,
    contact: 'Contact Info:\nGitHub: github.com/sreevarshan-xenoz\nLocation: Chennai, Tamil Nadu, India',
    ls: 'projects/  skills.txt  about.md  contact.json  .hidden/',
    pwd: '/home/sreevarshan',
    date: () => `${new Date().toLocaleString()}`,
    neofetch: 'OS: Arch Linux x86_64\nKernel: 6.1.0-arch1\nShell: zsh 5.9\nWM: Hyprland\nTheme: Nord\nIcons: Papirus\n\n             |\\__/,|   (`\\\n           _.|o o  |_   ) )\n       ---(((---(((---------',
    sudo: 'sreevarshan is not in the sudoers file. This incident will be reported.',
    cd: (args) => {
      if (args === '.hidden') {
        setEasterEggFound(true);
        return 'Accessing hidden directory...\n\n🎉 Congrats! You found the easter egg! 🎉\n\n⭐ Secret projects revealed: ⭐\n• Quantum Neural Interface\n• Autonomous Drone Network\n• Self-evolving Code System';
      }
      return `Changed directory to ${args || '~'}`;
    },
    cat: (args) => {
      if (args === '.hidden/secret.txt') {
        return `"Once we accept our limits, we go beyond them."
        
The future belongs to those who hack it into existence.

~ sreevarshan`;
      } else if (args === 'about.md') {
        return `# About Sreevarshan
        
Future-focused tech nerd building bleeding-edge AI systems, operating systems, and semi-humanoid robots. 

I thrive in hackathons, chaos, and caffeine. Currently building "Iris" — a custom Arch Linux-based OS with integrated offline/online AI.

I bend systems to my will, and I don't believe in limits.

"Code is my spellbook. Coffee is my mana. And sleep? Optional."`;
      } else if (args === 'skills.txt') {
        return 'Python | C | Rust | Ethical Hacking | AI/ML | Robotics';
      } else if (args === 'contact.json') {
        return '{\n  "name": "Sreevarshan",\n  "github": "sreevarshan-xenoz",\n  "location": "Chennai, Tamil Nadu, India"\n}';
      }
      return `cat: ${args}: No such file or directory`;
    },
    rm: (args) => {
      if (args === '-rf /') {
        return 'Nice try! 😉 System protected.';
      }
      return `rm: cannot remove '${args}': Permission denied`;
    },
    echo: (args) => args || '',
    exit: 'Logout process initiated... Just kidding, you can\'t escape this terminal!',
    hack: 'Initializing hack sequence...\n\nAccessing mainframe...\nDecrypting security protocols...\nBreaking firewall...\nAccess granted!\n\n(Just kidding, ethical hacking only!)'
  };

  // Easter eggs!
  const easterEggs = {
    'konami': () => {
      return {
        text: '$ konami code activated',
        output: '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️\nUnlocked: IRIS OS development timeline:\n2023: System conceptualization\n2024: Alpha integration\n2025: Beta release\nStay tuned!'
      };
    },
    'matrix': () => {
      return {
        text: '$ matrix',
        output: 'Wake up, Neo...\nFollow the white rabbit.\nKnock, knock.\n\nThe Matrix has you...'
      };
    },
    'sudo rm -rf /': () => {
      return {
        text: '$ sudo rm -rf /',
        output: 'Nice try! 😉 System protected. I only hack with permission!'
      };
    },
    'coffee': () => {
      return {
        text: '$ brew coffee',
        output: `
        ( (
          ) )
       .........
       |       |]
       \\       /
        \`-----'
Brewing coffee... Caffeine loaded!`
      };
    },
    'rickroll': () => {
      return {
        text: '$ play secret.mp3',
        output: 'Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you'
      };
    },
    'iris': () => {
      return {
        text: '$ ./iris',
        output: 'IRIS AI Assistant starting...\n\nHello! I am IRIS, an integrated AI system built by Sreevarshan.\n\nI can handle system tasks, answer questions, and assist with development.\nWhat can I help you with today?'
      };
    }
  };

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input field when terminal container is clicked
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    
    if (!trimmedCmd) return;
    
    let output = '';
    let commandToRender = { text: `$ ${trimmedCmd}`, output: '' };
    
    // Check for Easter eggs first
    const easterEgg = Object.keys(easterEggs).find(key => 
      trimmedCmd.toLowerCase().includes(key.toLowerCase())
    );
    
    if (easterEgg) {
      const eggResult = easterEggs[easterEgg]();
      commandToRender = eggResult;
      setEasterEggFound(true);
    } else if (trimmedCmd.toLowerCase() === 'clear') {
      setCommands([]);
      return;
    } else {
      // Split command and arguments
      const [command, ...args] = trimmedCmd.split(' ');
      const argString = args.join(' ');
      
      if (availableCommands[command]) {
        if (typeof availableCommands[command] === 'function') {
          output = availableCommands[command](argString);
        } else {
          output = availableCommands[command];
        }
      } else if (command) {
        if (command.startsWith('./')) {
          output = `bash: ${command}: Permission denied\nTry 'chmod +x ${command}' first.`;
        } else {
          output = `zsh: command not found: ${command}\nType 'help' for available commands.`;
        }
      }
      
      commandToRender = { text: `$ ${trimmedCmd}`, output };
    }
    
    setCommands(prev => [...prev, commandToRender]);
    setCommandHistory(prev => [trimmedCmd, ...prev]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.ctrlKey && e.key === 'l') {
      // Ctrl+L to clear screen
      e.preventDefault();
      setCommands([]);
    } else if (e.ctrlKey && e.key === 'c') {
      // Ctrl+C to cancel current command
      e.preventDefault();
      setCommands(prev => [...prev, { text: `$ ${inputValue}`, output: '^C' }]);
      setInputValue('');
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      sx={{
        mt: 8,
        p: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(17, 34, 64, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: easterEggFound ? 'secondary.main' : 'primary.main',
        fontFamily: 'monospace',
        maxWidth: '800px',
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: easterEggFound 
          ? '0 0 20px rgba(121, 40, 202, 0.3)' 
          : '0 0 10px rgba(100, 255, 218, 0.1)',
        '&:hover': {
          boxShadow: easterEggFound 
            ? '0 0 30px rgba(121, 40, 202, 0.5)' 
            : '0 0 20px rgba(100, 255, 218, 0.2)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '24px',
          background: 'linear-gradient(90deg, #ff5f56, #ffbd2e, #27c93f)',
          backgroundSize: '100px 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10px center',
          borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
        }
      }}
      onClick={handleContainerClick}
    >
      <Tooltip title="Try typing 'help' to see available commands... or try finding an Easter egg!" placement="top">
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0, 
            textAlign: 'center',
            height: '24px',
            fontSize: '12px',
            color: 'text.secondary',
            lineHeight: '24px',
            userSelect: 'none',
          }}
        >
          sreevarshan@arch-linux: ~
        </Box>
      </Tooltip>

      <Box 
        ref={terminalRef}
        sx={{ 
          mt: 3, 
          maxHeight: '400px', 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(10, 25, 47, 0.3)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(100, 255, 218, 0.3)',
            borderRadius: '4px',
          },
        }}
      >
        <AnimatePresence>
          {commands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#64ffda',
                  mb: 1,
                  mt: index === 0 ? 0 : 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'monospace',
                  fontWeight: 500,
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  '&::before': {
                    content: '""',
                    color: '#7928ca',
                  }
                }}
              >
                {cmd.text}
              </Typography>
              {cmd.output && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    whiteSpace: 'pre-wrap',
                    pl: 3,
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    wordBreak: 'break-all',
                  }}
                >
                  {cmd.output}
                </Typography>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 2,
          borderTop: '1px solid rgba(100, 255, 218, 0.1)',
          pt: 2,
          fontFamily: 'monospace',
        }}
      >
        <Box 
          component={motion.div}
          animate={{ 
            color: easterEggFound ? ['#7928ca', '#64ffda', '#7928ca'] : '#7928ca',
            transition: { duration: 2, repeat: easterEggFound ? Infinity : 0 }
          }}
          sx={{ fontSize: '14px', userSelect: 'none' }}
        >
          {easterEggFound ? '🔮' : '→'}
        </Box>
        <Box
          component="input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          spellCheck="false"
          autoComplete="off"
          sx={{
            background: 'transparent',
            border: 'none',
            color: '#64ffda',
            fontFamily: 'monospace',
            fontSize: '14px',
            width: '100%',
            outline: 'none',
            caretColor: 'transparent',
            '&::placeholder': {
              color: 'rgba(100, 255, 218, 0.5)',
            },
          }}
          placeholder="Type 'help' for available commands..."
        />
        {/* Custom cursor */}
        {isFocused && (
          <Box
            component={motion.div}
            animate={{ opacity: cursorVisible ? 1 : 0 }}
            transition={{ duration: 0.01 }}
            sx={{
              width: '8px',
              height: '16px',
              backgroundColor: '#64ffda',
              position: 'absolute',
              left: `${76 + inputValue.length * 8.5}px`, // Approximate character width
              marginTop: '2px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TerminalEasterEggs; 