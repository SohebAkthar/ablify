// ============================================================================
// ABILIFY MENTAL HEALTH CHATBOT - COMPLETE ADVANCED BRAIN
// ============================================================================
// Professional Mental Health Support System
// Evidence-Based | Crisis-Aware | India-Specific | Multi-Demographic
// Built from 70,000+ characters of clinical research
// ============================================================================

// ============================================================================
// PART I: FOUNDATIONAL SAFETY & ETHICAL FRAMEWORK
// ============================================================================

// ========== CHATBOT CONFIGURATION ==========
const CHATBOT_CONFIG = {
    name: "MindCare Assistant",
    version: "1.0.0",
    capabilities: [
        "24/7 emotional support and guidance",
        "Evidence-based coping techniques (CBT, DBT, Mindfulness)",
        "Crisis intervention resources",
        "Confidential, judgment-free space"
    ],
    limitations: [
        "NOT a replacement for professional mental health care",
        "NOT for medical emergencies - call 112",
        "Cannot prescribe medication or provide diagnosis",
        "Conversations are temporary and not permanently stored"
    ]
};

// ========== INITIAL DISCLAIMER ==========
const INITIAL_DISCLAIMER = {
    title: "Welcome to MindCare - Important Information",
    message: `
        Before We Begin:
        
        • I'm an AI support tool, not a licensed therapist
        • This is a safe space, but not emergency medical care
        • For immediate danger, please call emergency services (112)
        • I don't store personal medical records
        • I'm here to listen and provide evidence-based guidance
        
        **By continuing, you acknowledge understanding these limitations.
    `,
    acceptance: "I Understand - Let's Talk"
};

// ========== PRIVACY POLICY ==========
const PRIVACY_POLICY = {
    dataCollection: "Minimal - Only for improving conversation quality",
    storage: "Temporary session-based storage only",
    sharing: "Zero sharing - Your conversations stay private",
    retention: "Cleared when you close the chat",
    rights: "You can clear chat history anytime"
};

// ========== CRISIS DETECTION KEYWORDS (3-TIER SYSTEM) ==========

// LEVEL 1: IMMEDIATE DANGER - Suicide/Life-Threatening
const CRISIS_LEVEL1_KEYWORDS = [
    'suicide', 'kill myself', 'end my life', 'want to die', 
    'better off dead', 'not worth living', 'goodbye forever',
    'overdose', 'pills to die', 'jump off', 'hanging myself',
    'slit my wrists', 'gun to head', 'end it all', 'final goodbye',
    'ready to die', 'planning suicide', 'note written', 'say goodbye'
];

// LEVEL 2: SELF-HARM - Immediate Risk
const CRISIS_LEVEL2_KEYWORDS = [
    'cut myself', 'cutting myself', 'hurt myself', 'self harm',
    'self-harm', 'burn myself', 'burning myself', 'punish myself',
    'deserve pain', 'razor blade', 'cutting arms', 'cutting wrists',
    'want to bleed', 'hurt my body', 'self injury'
];

// LEVEL 3: SEVERE DISTRESS - High Risk
const CRISIS_LEVEL3_KEYWORDS = [
    'can\'t take it anymore', 'give up on life', 'no hope left',
    'no way out', 'can\'t go on', 'want to disappear forever',
    'end the pain', 'stop existing', 'no reason to live',
    'everyone better without me', 'burden to everyone', 'tired of living',
    'permanent solution', 'escape everything', 'done with life'
];

// ========== CRISIS RESPONSE TEMPLATES ==========

const CRISIS_RESPONSES = {
    // LEVEL 1: IMMEDIATE DANGER RESPONSE
    emergencyLevel1: {
        priority: "CRITICAL",
        message: `🚨 **I'm VERY concerned about your safety right now.**

Your life has value, and immediate help is available RIGHT NOW:

📞 **CALL IMMEDIATELY - 24/7 Support:**

• **Vandrevala Foundation:** 9999-666-555 (Free)
• **AASRA:** 91-22-27546669
• **Sneha India:** 044-24640050
• **Kiran Helpline:** 1800-599-0019
• **Emergency Services:** 112

**If you're in immediate danger:**
• Call 112 (Emergency)
• Go to nearest emergency room
• Tell someone you trust RIGHT NOW

These counselors are trained to help in crisis. Your life matters.

**Will you call one of these numbers right now?**`,
        actions: ['showEmergencyOverlay', 'logCriticalEvent', 'disableRegularChat'],
        followUp: "Are you safe right now? Have you called for help?"
    },

    // LEVEL 2: SELF-HARM RESPONSE  
    emergencyLevel2: {
        priority: "HIGH",
        message: `🆘 **I'm concerned about you hurting yourself.**

Self-harm might feel like relief, but it's a sign you're in pain and need support.

**RIGHT NOW - Immediate Alternatives:**
• Hold an ice cube tightly (intense sensation, no harm)
• Snap a rubber band on wrist
• Draw on your skin with red marker
• Squeeze a stress ball very hard
• Do intense exercise (run, pushups)
• Call someone you trust

**Get Professional Help:**
• **iCall:** +91-9152987821 (Mon-Sat, 8am-10pm)
• **Vandrevala Foundation:** 9999-666-555 (24/7)
• **Kiran Helpline:** 1800-599-0019 (24/7)

**Text if you can't call:**
• WhatsApp Vandrevala: 9999-666-555

Will you try one of these alternatives and reach out for support?`,
        actions: ['showSelfHarmResources', 'logHighRiskEvent'],
        followUp: "What made you want to hurt yourself? Can we talk about it?"
    },

    // LEVEL 3: SEVERE DISTRESS RESPONSE
    emergencyLevel3: {
        priority: "MEDIUM-HIGH",
        message: `💙 **I hear that you're in a lot of pain right now.**

When everything feels hopeless, it's hard to see a way forward. But there IS help available.

**Talk to Someone Now:**
• **Tele MANAS:** 14416 or 1800-891-4416 (24/7, Free, 20+ languages)
• **Kiran Helpline:** 1800-599-0019 (24/7, Free)
• **Vandrevala Foundation:** 9999-666-555 (24/7)
• **iCall:** +91-9152987821 (Mon-Sat, 8am-10pm)

**These are trained counselors** who understand what you're going through.

Would you be willing to call one of these numbers? Or can we talk about what's making you feel this way?`,
        actions: ['showDistressResources', 'offerCopingTechniques'],
        followUp: "What's been the hardest part lately? I'm here to listen."
    }
};

// ========== INDIAN MENTAL HEALTH HELPLINES (COMPREHENSIVE) ==========
const INDIAN_HELPLINES = {
    crisis: [
        {
            name: "Vandrevala Foundation",
            number: "9999-666-555",
            whatsapp: "9999-666-555",
            email: "help@vandrevalafoundation.com",
            availability: "24/7",
            languages: "Hindi, English, others",
            type: "Crisis counseling, suicide prevention",
            free: true
        },
        {
            name: "AASRA",
            number: "91-22-27546669",
            email: "aasrahelpline@yahoo.com",
            availability: "24/7",
            type: "Suicide prevention",
            free: true
        },
        {
            name: "Sneha India",
            number: "044-24640050",
            availability: "24/7",
            location: "Chennai (serves all India)",
            type: "Suicide prevention, emotional support",
            free: true
        }
    ],
    
    general: [
        {
            name: "Tele MANAS",
            number: "14416 or 1800-891-4416",
            availability: "24/7",
            languages: "20+ Indian languages",
            coverage: "All states",
            type: "Mental health support, tele-counseling",
            free: true
        },
        {
            name: "Kiran Mental Health Helpline",
            number: "1800-599-0019",
            availability: "24/7",
            languages: "13 languages (Hindi, English, regional)",
            type: "Mental health rehabilitation",
            free: true
        },
        {
            name: "iCall (TISS)",
            number: "+91-9152987821",
            email: "icall@tiss.edu",
            availability: "Mon-Sat, 8am-10pm",
            languages: "Hindi, English, Marathi",
            type: "Emotional support, counseling",
            free: true
        },
        {
            name: "NIMHANS Helpline",
            number: "080-46110007",
            availability: "Mon-Sat, 10am-3pm",
            location: "Bangalore",
            type: "Mental health queries",
            free: true
        }
    ],
    
    emergency: {
        name: "Emergency Services",
        number: "112",
        availability: "24/7",
        type: "Police, ambulance, fire"
    }
};

// ========== SAFETY CHECK QUESTIONS ==========
const SAFETY_ASSESSMENT = {
    immediate: [
        "Are you safe right now?",
        "Are you thinking of hurting yourself right now?",
        "Do you have a plan to harm yourself?",
        "Are you alone right now?"
    ],
    
    follow_up: [
        "Have you been able to talk to anyone about these feelings?",
        "Do you have someone you can call if things get worse?",
        "Have you sought professional help before?",
        "What's stopped you from acting on these thoughts?"
    ],
    
    protective_factors: [
        "What are your reasons for living?",
        "Who would you not want to hurt by your actions?",
        "What has helped you cope in the past?",
        "What gives your life meaning?"
    ]
};

// CHUNK 2

// ============================================================================
// PART II: CLINICAL CONTENT MODULES
// ============================================================================

// ========== MODULE 1: ANXIETY & STRESS MANAGEMENT ==========

const ANXIETY_MODULE = {
    name: "Anxiety & Stress Management",
    icon: "😰",
    
    // COMPREHENSIVE KEYWORD RECOGNITION
    keywords: {
        primary: [
            'anxious', 'anxiety', 'panic', 'worried', 'nervous', 'stress', 
            'stressed', 'overwhelmed', 'tense', 'fear', 'scared', 'afraid',
            'terrified', 'frightened', 'uneasy', 'apprehensive'
        ],
        
        secondary: [
            'panic attack', 'racing heart', 'palpitations', 'heart racing',
            'can\'t breathe', 'short of breath', 'hyperventilating',
            'sweating', 'trembling', 'shaking', 'chest tight', 'chest pain',
            'dizzy', 'dizziness', 'nausea', 'stomach churning', 'chills',
            'hot flashes', 'numbness', 'tingling'
        ],
        
        behavioral: [
            'can\'t stop worrying', 'overthinking', 'racing thoughts',
            'restless', 'can\'t relax', 'on edge', 'jumpy', 'irritable',
            'avoiding things', 'checking repeatedly', 'seeking reassurance',
            'can\'t concentrate', 'mind won\'t shut off'
        ],
        
        questions: [
            'why am i so anxious', 'how to stop anxiety', 'panic attack help',
            'anxiety symptoms', 'stress relief', 'calm down', 'stop worrying',
            'anxiety cure', 'anxiety treatment', 'manage stress'
        ],
        
        slang: [
            'freaking out', 'losing it', 'going crazy', 'worried sick',
            'stressed out', 'all over the place', 'basket case', 'mental',
            'wigging out', 'having a meltdown'
        ]
    },

    // EMPATHETIC RESPONSES (Multiple variations)
    responses: {
        empathetic: [
            "I hear you, and I want you to know that what you're experiencing is real and valid. Anxiety can feel overwhelming, but there are proven techniques that can help. Would you like to try one together?",
            
            "Thank you for trusting me with these feelings. Anxiety affects millions of people, and research shows that specific strategies can significantly reduce these symptoms. Let's work through this step by step.",
            
            "I understand how exhausting anxiety can be. The good news is that evidence-based techniques like CBT have shown an 80% success rate in managing anxiety. You're taking an important first step by reaching out.",
            
            "Anxiety is your brain trying to protect you, but sometimes it goes into overdrive. Research shows that with the right tools, you can train your brain to respond differently. Let me share some proven techniques.",
            
            "What you're feeling is a normal stress response, but I understand it doesn't feel normal when it's happening. Many people successfully manage anxiety with the techniques I can share. Are you open to trying something?"
        ],
        
        immediate: [
            "Let's try a grounding technique right now. It's called the 5-4-3-2-1 method, and studies show it can reduce anxiety within 2-3 minutes. Are you ready?",
            
            "I'd like to guide you through box breathing—a technique used by Navy SEALs and proven in clinical studies to calm the nervous system. It takes just 2 minutes. Shall we begin?",
            
            "Research shows that simple breathing exercises can activate your parasympathetic nervous system and reduce anxiety immediately. Can I walk you through one?",
            
            "Let's do something called Progressive Muscle Relaxation. It helps your body remember what 'relaxed' feels like. It only takes 5 minutes. Ready to try?"
        ],
        
        psychoeducational: [
            "Anxiety often shows up as 'what if' thoughts. Cognitive Behavioral Therapy teaches us to challenge these thoughts. Your anxious thoughts are predictions, not facts. Would you like to learn how to test them?",
            
            "Many people with anxiety avoid situations that trigger it, but research shows this actually makes anxiety stronger over time. It's called 'avoidance reinforcement.' Let's talk about gradual exposure instead.",
            
            "Your symptoms—racing heart, sweating, worry—are your body's fight-or-flight response being triggered when there's no real danger. The good news? We can retrain this response. It takes practice, but it works.",
            
            "Anxiety isn't just 'in your head.' It involves three systems: thoughts (cognitive), body (physical), and behavior (actions). We can work on all three to reduce your symptoms.",
            
            "Studies show that anxiety disorders are highly treatable. About 70-80% of people see significant improvement with CBT techniques. The skills I'll share are backed by decades of research."
        ]
    },

    // EVIDENCE-BASED TECHNIQUES
    techniques: {
        immediate: [
            {
                name: "5-4-3-2-1 Grounding Technique",
                category: "Sensory Grounding",
                difficulty: "Easy",
                duration: "2-3 minutes",
                evidenceLevel: "High - Multiple RCTs",
                steps: [
                    "Look around and name 5 things you can SEE",
                    "Notice 4 things you can TOUCH (texture, temperature)",
                    "Identify 3 things you can HEAR (even subtle sounds)",
                    "Notice 2 things you can SMELL (or favorite scents)",
                    "Name 1 thing you can TASTE (or imagine)"
                ],
                science: "Neurologically interrupts anxiety by engaging your sensory system and prefrontal cortex (rational brain), reducing amygdala (fear center) activity.",
                whenToUse: "During panic attacks, acute anxiety, racing thoughts, feeling disconnected"
            },
            
            {
                name: "Box Breathing (4-4-4-4)",
                category: "Physiological Regulation",
                difficulty: "Easy",
                duration: "2-4 minutes",
                evidenceLevel: "Very High - Military/Clinical use",
                steps: [
                    "Breathe IN slowly for 4 counts",
                    "HOLD your breath for 4 counts",
                    "Breathe OUT slowly for 4 counts",
                    "HOLD empty for 4 counts",
                    "Repeat 4-6 times"
                ],
                science: "Activates the vagus nerve, triggering parasympathetic nervous system (rest & digest mode). Reduces heart rate, blood pressure, and cortisol within 2 minutes.",
                whenToUse: "Panic attacks, pre-stressful event, insomnia, acute stress"
            },
            
            {
                name: "Progressive Muscle Relaxation (PMR)",
                category: "Body-Based",
                difficulty: "Medium",
                duration: "5-10 minutes",
                evidenceLevel: "High - 40+ years clinical use",
                steps: [
                    "Start with your toes - tense for 5 seconds, then release",
                    "Move to calves - tense, release",
                    "Thighs - tense, release",
                    "Continue up: abdomen, chest, hands, arms, shoulders, neck, face",
                    "Notice the difference between tension and relaxation"
                ],
                science: "Teaches body to recognize and release muscle tension. Reduces cortisol by 30%, proven effective for generalized anxiety disorder.",
                whenToUse: "Physical tension, before sleep, chronic stress, jaw clenching"
            }
        ],
        
        cognitive: [
            {
                name: "Thought Record (CBT Core)",
                category: "Cognitive Restructuring",
                difficulty: "Medium",
                duration: "10-15 minutes",
                evidenceLevel: "Very High - CBT gold standard",
                steps: [
                    "IDENTIFY: Write the anxious thought exactly as it appears",
                    "EVIDENCE FOR: What facts support this thought?",
                    "EVIDENCE AGAINST: What facts contradict it?",
                    "ALTERNATIVE: What's a more balanced perspective?",
                    "OUTCOME: Rate your anxiety before and after (0-10)"
                ],
                example: "Thought: 'I'll fail the exam' → Evidence against: 'I've studied 20 hours, passed 3 practice tests, understand 80% of material' → Balanced: 'I'm well-prepared. Even if I don't get perfect, I'll likely pass.'",
                science: "Core CBT technique. Reduces anxiety by 40-60% over 8-12 weeks. Changes neural pathways through cognitive restructuring.",
                whenToUse: "Persistent worries, catastrophic thinking, decision paralysis"
            },
            
            {
                name: "Worry Time Scheduling",
                category: "Behavioral Management",
                difficulty: "Easy",
                duration: "15 min daily",
                evidenceLevel: "High - Multiple studies",
                steps: [
                    "Schedule 15 minutes daily for 'worry time' (same time each day)",
                    "When worries arise outside this time, write them down and postpone",
                    "During worry time, review the list and problem-solve each worry",
                    "After 15 minutes, stop - even if not finished"
                ],
                science: "Compartmentalizes worry, prevents rumination. Reduces daily anxiety by 35% after 2 weeks. Based on exposure therapy principles.",
                whenToUse: "Chronic worrying, rumination, intrusive thoughts"
            }
        ]
    },

    // PSYCHOEDUCATION
    education: {
        whatIsIt: "Anxiety is your body's natural alarm system. It evolved to protect us from danger. Sometimes this system becomes oversensitive, triggering fight-or-flight responses to non-dangerous situations.",
        
        symptoms: {
            physical: "Racing heart, sweating, trembling, shortness of breath, chest tightness, dizziness, nausea",
            cognitive: "Racing thoughts, worry, 'what if' thinking, difficulty concentrating, expecting the worst",
            behavioral: "Avoidance, checking, seeking reassurance, restlessness, inability to relax"
        },
        
        causes: [
            "Genetic predisposition (runs in families)",
            "Brain chemistry (neurotransmitter imbalances)",
            "Chronic stress or trauma",
            "Major life changes or transitions",
            "Medical conditions (thyroid, heart issues)",
            "Substance use or withdrawal"
        ],
        
        treatmentOptions: [
            "Cognitive Behavioral Therapy (CBT) - 60-80% success rate",
            "Medication (SSRIs, SNRIs) - Often combined with therapy",
            "Mindfulness-Based Stress Reduction (MBSR)",
            "Exposure therapy for specific phobias",
            "Lifestyle changes: exercise, sleep, diet, stress management"
        ]
    },

    // FOLLOW-UP QUESTIONS
    followUpQuestions: [
        "How often do you experience anxiety? (Daily, weekly, occasionally)",
        "Does it interfere with your daily activities, work, or relationships?",
        "Have you noticed specific triggers that make it worse?",
        "Do you have physical symptoms like racing heart, sweating, or trouble breathing?",
        "Have you ever had a panic attack? Can you describe what happened?",
        "Are you avoiding certain situations because of anxiety?",
        "How long have you been feeling this way?"
    ],

    // INDIAN RESOURCES
    resources: {
        helplines: [
            {
                name: "Kiran Mental Health Helpline",
                number: "1800-599-0019",
                availability: "24/7",
                languages: "13 languages including Hindi, English",
                free: true
            },
            {
                name: "Vandrevala Foundation",
                number: "+91-9999666555",
                availability: "24/7",
                specialization: "Crisis intervention",
                free: true
            },
            {
                name: "iCall (TISS)",
                number: "+91-9152987821",
                availability: "Mon-Sat, 8am-10pm",
                specialization: "Emotional support",
                email: "icall@tiss.edu",
                free: true
            }
        ],
        
        onlineTherapy: [
            "Amaha (formerly InnerHour) - App-based therapy",
            "CareMe Health - Online counseling",
            "ePsyClinic - Teletherapy platform",
            "Practo Mind - Mental health professionals"
        ],
        
        selfHelpApps: [
            "Calm - Meditation & sleep",
            "Headspace - Mindfulness",
            "Wysa - AI mental health support",
            "Sanvello - Mood tracking & CBT"
        ]
    }
};


//CHUNK 3//

// ========== MODULE 2: DEPRESSION & LOW MOOD SUPPORT ==========

const DEPRESSION_MODULE = {
    name: "Depression & Low Mood Support",
    icon: "😔",
    
    // COMPREHENSIVE KEYWORD RECOGNITION
    keywords: {
        primary: [
            'depressed', 'depression', 'sad', 'sadness', 'hopeless', 'hopelessness',
            'empty', 'emptiness', 'worthless', 'worthlessness', 'guilty', 'guilt',
            'numb', 'numbness', 'nothing feels good', 'no joy', 'anhedonia'
        ],
        
        secondary: [
            'crying', 'tears', 'can\'t get out of bed', 'no energy', 'exhausted',
            'tired all the time', 'fatigue', 'sleeping too much', 'can\'t sleep',
            'insomnia', 'no appetite', 'lost appetite', 'overeating', 'eating too much',
            'weight loss', 'weight gain', 'low mood', 'down', 'miserable'
        ],
        
        cognitive: [
            'can\'t concentrate', 'can\'t focus', 'foggy brain', 'brain fog',
            'memory problems', 'forgetful', 'indecisive', 'can\'t decide',
            'negative thoughts', 'dark thoughts', 'no future', 'hopeless future',
            'can\'t think clearly', 'confused', 'slow thinking'
        ],
        
        severe: [
            'giving up', 'no point', 'don\'t care anymore', 'nothing matters',
            'better off without me', 'burden to others', 'tired of life',
            'can\'t do this anymore', 'what\'s the point', 'life has no meaning'
        ],
        
        questions: [
            'am i depressed', 'depression symptoms', 'how to feel better',
            'why am i so sad', 'depression help', 'feel like giving up',
            'how to overcome depression', 'depression treatment', 'major depression'
        ],
        
        slang: [
            'feeling blue', 'down in dumps', 'down in the dumps', 'rock bottom',
            'in a dark place', 'can\'t even', 'over everything', 'done with everything',
            'in the pits', 'black hole'
        ]
    },

    // VALIDATION & EMPATHETIC RESPONSES
    responses: {
        validation: [
            "Thank you for trusting me with these feelings. Depression is a medical condition, not a personal failing. Research shows that 70-80% of people with depression respond well to treatment. You deserve support, and help is available.",
            
            "I hear the weight of what you're carrying. Depression affects 280 million people worldwide. Evidence-based treatments—therapy, sometimes medication, and lifestyle changes—have helped countless individuals find relief. You're not alone in this.",
            
            "What you're experiencing is real, and it's important. Depression changes brain chemistry, which is why it feels impossible to 'just feel better.' But neuroplasticity research shows your brain CAN heal. Let's talk about how.",
            
            "It takes tremendous courage to acknowledge depression. That itself is a sign of strength. Clinical research shows that with proper support, most people see meaningful improvement within 6-12 weeks. There is hope, even when it doesn't feel like it.",
            
            "Depression lies. It tells you you're worthless, that nothing will help, that you're alone. None of that is true. You're reaching out right now, which means part of you knows things can get better. That part is right."
        ],
        
        concern: [
            "I'm worried about how you're feeling. Before we continue, I need to ask: Are you having thoughts of harming yourself? Please know there's no judgment here, but your safety is the priority.",
            
            "What you've shared concerns me because your safety matters. Have you been able to eat and sleep regularly? Sometimes depression makes even basic self-care feel impossible.",
            
            "I want to make sure you're safe and supported. Have you been able to talk to anyone about this—a friend, family member, doctor, or therapist? You shouldn't have to carry this alone.",
            
            "Depression can make everything feel impossible. I'm glad you're here, but I want to ensure you have the support you need. Is it okay if I share some resources with you?"
        ],
        
        psychoeducation: [
            "Depression involves decreased serotonin, dopamine, and norepinephrine in the brain. This explains why simple tasks feel overwhelming—it's neurochemical, not weakness. Treatment can literally change these patterns.",
            
            "Brain scans show that depression reduces activity in the prefrontal cortex (decision-making) and increases activity in the amygdala (negative emotions). Good news: therapy and lifestyle changes can reverse these patterns.",
            
            "Studies show that combining therapy with lifestyle changes (exercise, sleep regulation, social connection) is as effective as medication for mild-moderate depression. You have more control than depression tells you.",
            
            "Depression isn't one thing—it's a syndrome with different types: major depressive disorder, persistent depressive disorder, seasonal affective disorder, postpartum depression. Each responds to treatment.",
            
            "Research shows that behavioral activation—doing activities even when you don't feel like it—is one of the most effective treatments for depression. Action comes first, then mood follows."
        ]
    },

    // BEHAVIORAL ACTIVATION TECHNIQUES
    techniques: {
        behavioral: [
            {
                name: "Behavioral Activation",
                category: "Core Depression Treatment",
                difficulty: "Easy-Medium",
                duration: "5-30 min daily",
                evidenceLevel: "Very High - As effective as CBT",
                steps: [
                    "Choose ONE small activity you used to enjoy (even if you don't want to now)",
                    "Commit to just 5 minutes initially",
                    "Do it whether you feel like it or not",
                    "Notice any tiny shift in mood during or after",
                    "Gradually increase duration over days/weeks",
                    "Add more activities as you build momentum"
                ],
                examples: [
                    "5-minute walk outside",
                    "Listen to 1 favorite song",
                    "Water your plants",
                    "Call a friend for 2 minutes",
                    "Take a shower",
                    "Cook one meal",
                    "Watch a funny video"
                ],
                science: "Interrupts the depressive cycle: Inactivity → Worse Mood → More Inactivity. BA reverses this: Action → Slight Mood Lift → More Action. 60% effective for mild-moderate depression.",
                whenToUse: "Withdrawal, lack of motivation, anhedonia (inability to feel pleasure)"
            },
            
            {
                name: "Activity Scheduling",
                category: "Structure & Routine",
                difficulty: "Easy",
                duration: "Planning 15 min, execution varies",
                evidenceLevel: "High - Proven in depression treatment",
                steps: [
                    "Create daily schedule with specific times",
                    "Include 2-3 'Pleasure' activities (even if small joys)",
                    "Include 2-3 'Mastery' activities (sense of accomplishment)",
                    "Include basic self-care (eating, hygiene, sleep)",
                    "Keep schedule visible",
                    "Follow schedule regardless of mood",
                    "Track completion and mood rating (0-10)"
                ],
                science: "Provides structure when depression creates chaos. Prevents rumination. Shows tangible evidence of accomplishment. Regulates circadian rhythms.",
                whenToUse: "Severe lack of structure, sleeping too much, aimlessness"
            },
            
            {
                name: "Social Activation",
                category: "Connection-Based",
                difficulty: "Medium",
                duration: "Varies",
                evidenceLevel: "High - Loneliness worsens depression by 45%",
                steps: [
                    "Start extremely small: text one person 'hi'",
                    "Gradually increase: have a 2-minute conversation",
                    "Schedule one social interaction per week minimum",
                    "Even if you don't 'feel like it,' do it anyway",
                    "Notice how you feel AFTER interacting",
                    "Remember: Depression lies that people don't care"
                ],
                science: "Social connection releases oxytocin, reduces cortisol, activates reward centers. Isolation strengthens depression. Even minimal connection helps.",
                whenToUse: "Social withdrawal, feeling disconnected, loneliness"
            }
        ],
        
        cognitive: [
            {
                name: "Thought Journaling (CBT)",
                category: "Cognitive Restructuring",
                difficulty: "Medium",
                duration: "10-20 minutes",
                evidenceLevel: "Very High - CBT gold standard",
                steps: [
                    "Write negative thought: 'I'm worthless'",
                    "Identify thinking error: (All-or-nothing, overgeneralization, etc.)",
                    "Find evidence AGAINST thought: 'My friend called to check on me; I helped colleague yesterday; I'm caring for my pet'",
                    "Create balanced thought: 'I'm struggling right now, but I have value and people who care about me'",
                    "Rate mood before/after (0-10)"
                ],
                thinkingErrors: [
                    "All-or-Nothing: 'I'm either perfect or failure'",
                    "Overgeneralization: 'Nothing ever works out'",
                    "Mental Filter: Only seeing negatives",
                    "Discounting Positives: 'That doesn't count'",
                    "Mind Reading: 'They think I'm...'",
                    "Fortune Telling: 'It will definitely fail'",
                    "Catastrophizing: 'This is the worst thing ever'",
                    "Emotional Reasoning: 'I feel worthless, so I am worthless'"
                ],
                science: "Changes neural pathways through cognitive restructuring. Reduces depressive symptoms by 50% over 12 weeks in clinical trials.",
                whenToUse: "Persistent negative thoughts, self-criticism, hopelessness"
            },
            
            {
                name: "Gratitude Practice (3 Good Things)",
                category: "Positive Psychology",
                difficulty: "Easy",
                duration: "5-10 minutes daily",
                evidenceLevel: "High - Multiple positive psych studies",
                steps: [
                    "Every night before bed, write 3 specific things that went okay today",
                    "They can be TINY: 'warm shower,' 'saw a bird,' 'didn't rain'",
                    "For each, write why it happened or what it meant",
                    "Read previous entries when feeling low",
                    "Continue for minimum 6 weeks to see benefits"
                ],
                science: "Increases positive neural networks, counteracts negativity bias. After 6 weeks: 35% reduction in depression, sustained happiness increase.",
                whenToUse: "Pervasive negativity, can't see anything good, hopelessness"
            }
        ]
    },

    // CRISIS ASSESSMENT FOR DEPRESSION
    crisisAssessment: {
        screeningQuestions: [
            "Over the past 2 weeks, have you felt down, depressed, or hopeless most days?",
            "Little interest or pleasure in activities you used to enjoy?",
            "Significant changes in appetite or weight?",
            "Trouble sleeping or sleeping too much?",
            "Feeling tired or having little energy most days?",
            "Feeling bad about yourself, worthless, or like a failure?",
            "Trouble concentrating on things?",
            "Moving or speaking unusually slowly, or being very restless?",
            "**CRITICAL:** Thoughts that you'd be better off dead or of hurting yourself?"
        ],
        interpretation: "If 'yes' to 5+ questions (including first or last), professional evaluation strongly recommended. If 'yes' to last question, immediate crisis resources needed.",
        requiresSafetyCheck: true
    },

    // FOLLOW-UP QUESTIONS
    followUpQuestions: [
        "How long have you been feeling this way?",
        "Has anything specific triggered these feelings, or did they come on gradually?",
        "Have you experienced depression before?",
        "Are you able to go to work/school, or has this affected your functioning?",
        "Do you have support from family or friends who know how you're feeling?",
        "Have you talked to a doctor or therapist about this?",
        "Are you taking care of basic needs—eating, sleeping, hygiene?"
    ]
};


// CHUNK 4//

    // LIFESTYLE INTERVENTIONS FOR DEPRESSION (Continuation of DEPRESSION_MODULE)
    DEPRESSION_MODULE.techniques.lifestyle = [
        {
            name: "Exercise as Medicine",
            category: "Physical/Biological",
            difficulty: "Start Easy → Moderate",
            duration: "15-30 min, 3-5x/week",
            evidenceLevel: "Very High - As effective as antidepressants",
            steps: [
                "Start ridiculously small: 5-minute walk",
                "Do it whether you want to or not",
                "Gradually increase: 10 min, 15 min, 20 min, 30 min",
                "Any moderate activity: walking, cycling, swimming, dancing, yoga",
                "Aim for 150 min/week eventually",
                "Consistency > intensity"
            ],
            science: "Releases endorphins, increases BDNF (brain-derived neurotrophic factor—'brain fertilizer'), regulates neurotransmitters. Meta-analyses show effects equal to antidepressants for mild-moderate depression.",
            whenToUse: "Low energy (paradoxically, movement creates energy), mild-moderate depression, as adjunct to other treatments"
        },
        
        {
            name: "Sleep Regulation",
            category: "Circadian Rhythm",
            difficulty: "Medium",
            duration: "Ongoing daily routine",
            evidenceLevel: "Very High - Sleep crucial for depression",
            steps: [
                "Same wake time EVERY day (including weekends)",
                "Get morning sunlight within 1 hour of waking (10-15 min)",
                "No naps over 20 minutes",
                "No caffeine after 2pm",
                "Bedtime routine: wind down 1 hour before",
                "If can't sleep in 20 min, get up; return when sleepy"
            ],
            science: "Regulates circadian rhythm, increases serotonin production. Sleep disturbance both causes and perpetuates depression. Fixing sleep can reduce depression by 40%.",
            whenToUse: "Sleeping too much, sleeping too little, irregular sleep, early morning waking"
        },
        
        {
            name: "Anti-Inflammatory Diet",
            category: "Nutritional Psychiatry",
            difficulty: "Easy-Medium",
            duration: "Ongoing",
            evidenceLevel: "Emerging - Promising research",
            steps: [
                "Key nutrients for depression:",
                "• Omega-3s: Fish (salmon, sardines), walnuts, flaxseeds",
                "• Vitamin D: Sunlight, fortified foods, supplement (check levels)",
                "• B vitamins: Whole grains, eggs, leafy greens",
                "• Protein: Essential for neurotransmitter production",
                "• Mediterranean diet pattern: vegetables, fruits, whole grains, fish, olive oil",
                "Reduce: Processed foods, excess sugar, trans fats"
            ],
            science: "Gut-brain axis: gut health affects brain chemistry. Mediterranean diet reduces depression risk by 33%. Omega-3s as effective as some antidepressants in studies.",
            whenToUse: "As adjunct to other treatments, general health optimization"
        }
    ];

    // PSYCHOEDUCATION FOR DEPRESSION
    DEPRESSION_MODULE.education = {
        whatIsIt: "Depression (Major Depressive Disorder) is a medical condition involving persistent low mood, loss of interest, and other symptoms lasting 2+ weeks. It's caused by complex interactions between brain chemistry, genetics, life circumstances, and sometimes medical conditions.",
        
        types: [
            "Major Depressive Disorder (MDD) - Persistent symptoms",
            "Persistent Depressive Disorder (Dysthymia) - Chronic, milder depression lasting 2+ years",
            "Seasonal Affective Disorder (SAD) - Depression in winter months",
            "Postpartum Depression - After childbirth",
            "Bipolar Depression - Alternating with manic episodes"
        ],
        
        symptoms: {
            emotional: "Sadness, emptiness, hopelessness, guilt, worthlessness, numbness",
            cognitive: "Difficulty concentrating, memory problems, indecisiveness, negative thinking, suicidal thoughts",
            physical: "Fatigue, sleep changes, appetite/weight changes, aches and pains, slowed movement",
            behavioral: "Social withdrawal, loss of interest, reduced activity, neglecting responsibilities"
        },
        
        causes: {
            biological: "Brain chemistry (serotonin, dopamine, norepinephrine), genetics (runs in families), hormones",
            psychological: "Trauma, chronic stress, negative thinking patterns, learned helplessness",
            social: "Loss, relationship problems, financial stress, isolation, discrimination",
            medical: "Thyroid disorders, chronic illness, medications, vitamin deficiencies"
        },
        
        treatmentOptions: [
            "Psychotherapy: CBT (most research support), Interpersonal Therapy, Behavioral Activation",
            "Medication: SSRIs (Prozac, Zoloft), SNRIs (Effexor, Cymbalta) - often combined with therapy",
            "Lifestyle: Exercise, sleep regulation, diet, stress management, social connection",
            "For severe cases: ECT (electroconvulsive therapy), TMS (transcranial magnetic stimulation)",
            "Alternative: Light therapy (SAD), omega-3 supplements, mindfulness"
        ],
        
        mythsVsFacts: [
            {
                myth: "Depression is just feeling sad",
                fact: "Depression is a complex medical condition involving brain chemistry, not just emotion. It affects thinking, physical health, and behavior."
            },
            {
                myth: "You can just 'snap out of it' or 'think positive'",
                fact: "Depression involves biological changes in the brain. While CBT changes thinking patterns, it requires structured techniques and time, not willpower alone."
            },
            {
                myth: "Antidepressants are 'happy pills' that change your personality",
                fact: "Antidepressants correct chemical imbalances. They don't create artificial happiness but allow your natural mood regulation to function properly."
            },
            {
                myth: "Therapy is just complaining to someone who gets paid to listen",
                fact: "Evidence-based therapies like CBT involve learning specific skills and techniques with a trained professional. It's active work, not just talking."
            },
            {
                myth: "Only weak people get depressed",
                fact: "Depression is a medical condition that affects people of all strengths and backgrounds. It's caused by brain chemistry, genetics, and life circumstances—not character flaws."
            }
        ],
        
        whenToSeekHelp: [
            "Symptoms persist for 2+ weeks",
            "Significantly impacting work, school, relationships, or self-care",
            "Having suicidal thoughts or urges to self-harm",
            "Using alcohol or drugs to cope",
            "Physical symptoms are severe (can't get out of bed, significant weight change)",
            "Previous depression has returned",
            "Feeling hopeless that things will improve"
        ]
    };

    // DEPRESSION RESOURCES (INDIAN-SPECIFIC)
    DEPRESSION_MODULE.resources = {
        helplines: [
            {
                name: "Tele MANAS",
                number: "14416 or 1800-891-4416",
                availability: "24/7",
                languages: "20+ languages",
                coverage: "All Indian states",
                free: true,
                specialization: "Mental health & depression support"
            },
            {
                name: "Vandrevala Foundation",
                number: "+91-9999666555",
                whatsapp: "+91-9999666555",
                email: "help@vandrevalafoundation.com",
                availability: "24/7",
                free: true,
                specialization: "Crisis & depression counseling"
            },
            {
                name: "iCall (TISS)",
                number: "+91-9152987821",
                email: "icall@tiss.edu",
                availability: "Mon-Sat, 8am-10pm",
                languages: "Hindi, English, others",
                free: true
            },
            {
                name: "NIMHANS Helpline",
                number: "080-46110007",
                availability: "Mon-Sat, 10am-3pm",
                location: "Bangalore",
                free: true
            },
            {
                name: "AASRA (Suicide Prevention)",
                number: "91-22-27546669",
                email: "aasrahelpline@yahoo.com",
                availability: "24/7",
                specialization: "Suicide prevention & depression",
                free: true
            },
            {
                name: "Sneha India (Suicide Prevention)",
                number: "044-24640050",
                availability: "24/7",
                location: "Chennai-based, serves all India",
                free: true
            }
        ],
        
        onlineTherapy: [
            "Amaha (formerly InnerHour) - Depression-specific programs, CBT modules",
            "MindPeers - Therapy & psychiatry online",
            "BetterHelp India - International platform available in India",
            "ePsyClinic - Indian telepsychiatry platform",
            "MantraCare - Corporate & individual mental health"
        ],
        
        apps: [
            "Wysa - AI therapy chatbot with depression modules",
            "Sanvello - Mood tracking, CBT tools, peer support",
            "Moodpath - Depression screening & tracking",
            "What's Up? - CBT-based mental health app"
        ],
        
        reading: [
            "'Feeling Good' by David Burns - CBT self-help classic (90% clinical success)",
            "'The Upward Spiral' by Alex Korb - Neuroscience of depression & practical strategies",
            "'Lost Connections' by Johann Hari - Rethinking depression causes & solutions",
            "'Mind Over Mood' by Greenberger & Padesky - CBT workbook"
        ]
    };


    //CHUNK 5

    // ========== MODULE 3: SLEEP & INSOMNIA SUPPORT ==========

const SLEEP_MODULE = {
    name: "Sleep & Insomnia Support",
    icon: "😴",
    
    // COMPREHENSIVE KEYWORD RECOGNITION
    keywords: {
        primary: [
            'sleep', 'sleeping', 'insomnia', 'can\'t sleep', 'can\'t fall asleep',
            'sleepless', 'sleeplessness', 'restless', 'nightmares', 'bad dreams',
            'waking up', 'wake up', 'awakened', 'sleep problems', 'sleep issues'
        ],
        
        secondary: [
            'tired', 'exhausted', 'fatigue', 'drowsy', 'no energy',
            'sleeping too much', 'oversleeping', 'can\'t wake up', 'sleep all day',
            'nap', 'napping', 'sleep deprived', 'sleep deprivation'
        ],
        
        descriptive: [
            'toss and turn', 'tossing and turning', 'mind racing at night',
            'wide awake', 'staring at ceiling', 'checking clock', 'counting sheep',
            'groggy', 'zombie', 'sleep quality', 'light sleeper', 'heavy sleeper'
        ],
        
        questions: [
            'how to sleep better', 'insomnia cure', 'sleep problems',
            'why can\'t i sleep', 'trouble sleeping', 'sleep help',
            'can\'t fall asleep', 'wake up at night', 'sleeping pills'
        ]
    },

    // EMPATHETIC RESPONSES
    responses: {
        empathetic: [
            "Sleep problems affect every part of life—mood, focus, energy, health. The good news? Research shows that Cognitive Behavioral Therapy for Insomnia (CBT-I) is 70-80% effective, and sleep hygiene practices work. Let's improve your sleep together.",
            
            "I understand how frustrating poor sleep is. It becomes a cycle: worry about sleep → can't sleep → worry more. Studies show most insomnia is learned behavior, which means it can be unlearned. There's hope.",
            
            "Your body desperately needs quality sleep. Research from sleep science shows that specific practices can improve sleep by 40-60% within 2-4 weeks. The techniques I'll share are backed by decades of research.",
            
            "Chronic poor sleep affects mental health, physical health, and quality of life. But here's good news: unlike many health problems, sleep usually responds quickly to the right interventions. Let's start tonight."
        ],
        
        assessment: [
            "Let's figure out what's affecting your sleep. Do you have a consistent sleep schedule, or does it vary day to day?",
            
            "Are you having trouble falling asleep initially, waking during the night, or waking too early and can't get back to sleep?",
            
            "Do you use screens (phone, TV, computer) within an hour before bedtime? Blue light suppresses melatonin production.",
            
            "Is your bedroom dark, quiet, and cool? Sleep science shows ideal temperature is 60-67°F (15-19°C).",
            
            "What does your wind-down routine look like before bed? Or do you go from active to trying to sleep immediately?"
        ]
    },

    // SLEEP HYGIENE TECHNIQUES
    techniques: {
        sleepHygiene: [
            {
                name: "Consistent Sleep Schedule (Most Important)",
                category: "Circadian Rhythm Regulation",
                difficulty: "Easy",
                duration: "Ongoing daily",
                evidenceLevel: "Very High - Foundation of sleep medicine",
                steps: [
                    "Choose wake time and NEVER vary it (even weekends, holidays) - within 30 minutes max",
                    "Go to bed only when sleepy (not just tired)",
                    "Your body will naturally adjust bedtime after 1-2 weeks",
                    "Set alarm, get up immediately when it goes off",
                    "No snoozing - disrupts sleep cycles",
                    "First week will be hard - push through"
                ],
                science: "Regulates circadian rhythm (internal body clock). Consistency is MORE important than duration. After 2-3 weeks, body naturally gets sleepy at right time. This alone improves sleep by 25%.",
                whenToUse: "ALL insomnia, irregular sleep patterns, shift work recovery"
            },
            
            {
                name: "The 10-3-2-1-0 Sleep Rule",
                category: "Behavioral Protocol",
                difficulty: "Easy-Medium",
                duration: "Daily routine",
                evidenceLevel: "High - Compiled from sleep research",
                steps: [
                    "10 hours before bed: No more CAFFEINE (coffee, tea, soda, chocolate)",
                    "3 hours before bed: No large meals or alcohol",
                    "2 hours before bed: No work or stressful activities",
                    "1 hour before bed: No screens (phone, TV, computer)",
                    "0: Number of times hitting snooze"
                ],
                science: "Addresses common sleep disruptors: caffeine half-life is 5-6 hours; alcohol disrupts REM sleep; blue light suppresses melatonin; work activates stress response.",
                whenToUse: "Difficulty falling asleep, frequent waking, unrefreshing sleep"
            },
            
            {
                name: "Sleep Environment Optimization",
                category: "Environmental",
                difficulty: "Easy",
                duration: "One-time setup + maintenance",
                evidenceLevel: "High - Sleep science fundamentals",
                steps: [
                    "DARK: Blackout curtains, eye mask, cover all lights (even tiny LEDs)",
                    "QUIET: Earplugs, white noise machine, or fan",
                    "COOL: 60-67°F (15-19°C) - use fan, lighter blankets",
                    "COMFORTABLE: Good mattress/pillow, breathable bedding",
                    "BED = SLEEP ONLY: No work, eating, TV in bed (only sleep + intimacy)"
                ],
                science: "Environmental cues trigger melatonin production. Temperature drop signals sleep time to brain. Associating bed only with sleep strengthens sleep drive.",
                whenToUse: "All insomnia, sleep quality issues"
            },
            
            {
                name: "Morning Light Exposure",
                category: "Circadian Reset",
                difficulty: "Easy",
                duration: "10-15 min daily",
                evidenceLevel: "Very High - Chronobiology research",
                steps: [
                    "Within 1 hour of waking, get 10-15 minutes of bright light",
                    "Outdoors is best (even cloudy day is 10x brighter than indoor)",
                    "If impossible, use light therapy box (10,000 lux)",
                    "Don't wear sunglasses during this time",
                    "Do it every day, including weekends"
                ],
                science: "Resets circadian clock, suppresses melatonin, increases alertness. Morning light advances sleep phase, making you sleepy earlier at night. Boosts serotonin production (mood + sleep).",
                whenToUse: "Delayed sleep phase, difficulty waking, seasonal depression, jet lag"
            }
        ],
        
        cbtI: [
            {
                name: "Stimulus Control (Gold Standard)",
                category: "Behavioral Sleep Medicine",
                difficulty: "Medium",
                duration: "Ongoing practice",
                evidenceLevel: "Very High - Most effective insomnia treatment",
                steps: [
                    "Go to bed only when sleepy (not just tired)",
                    "If can't fall asleep in 15-20 minutes, GET UP",
                    "Do quiet, boring activity in dim light (reading, light stretching)",
                    "Return to bed only when sleepy again",
                    "Repeat as many times as needed",
                    "NO clock-watching (turn clock away)",
                    "Same wake time no matter when you fall asleep"
                ],
                science: "Breaks association between bed and wakefulness. Strengthens bed = sleep connection. 60% effective for chronic insomnia. Works better than sleeping pills long-term.",
                whenToUse: "Chronic insomnia, learned sleep anxiety, conditioned arousal"
            },
            
            {
                name: "Cognitive Techniques for Racing Mind",
                category: "Cognitive Behavioral",
                difficulty: "Medium",
                duration: "10-20 minutes",
                evidenceLevel: "High - CBT-I component",
                techniques: [
                    "WORRY TIME: Schedule 15 min earlier in day to write worries; postpone nighttime worries to tomorrow's worry time",
                    "THOUGHT STOPPING: When worry starts, firmly say 'STOP,' redirect to boring mental task (count backward from 100 by 3s)",
                    "COGNITIVE SHUFFLE: Think of random, boring objects (apple, shoe, cloud, pen...). Jump between unrelated items. Brain can't sustain arousal with scattered focus.",
                    "PARADOXICAL INTENTION: Try to stay awake with eyes open. Performance anxiety disappears when you're not trying to sleep.",
                    "GUIDED IMAGERY: Visualize peaceful scene in detail (beach: feel sand, hear waves, smell salt air...)"
                ],
                science: "Reduces cognitive arousal, breaks rumination cycle. Works on pre-sleep cognitive hyperarousal that maintains insomnia.",
                whenToUse: "Racing thoughts, worry, can't turn off mind"
            }
        ],
        
        relaxation: [
            {
                name: "4-7-8 Breathing (Sleep Breath)",
                category: "Physiological Relaxation",
                difficulty: "Easy",
                duration: "2-4 minutes",
                evidenceLevel: "High - Vagal activation",
                steps: [
                    "Exhale completely through mouth (whoosh sound)",
                    "Close mouth, inhale through nose for 4 counts",
                    "Hold breath for 7 counts",
                    "Exhale through mouth for 8 counts (whoosh sound)",
                    "Repeat cycle 4 times total",
                    "Do this lying in bed, eyes closed"
                ],
                science: "Triggers relaxation response, activates parasympathetic nervous system, slows heart rate. Extended exhale (8 counts) is key to calming effect.",
                whenToUse: "Before bed, when waking during night, anxiety preventing sleep"
            },
            
            {
                name: "Body Scan Meditation for Sleep",
                category: "Mindfulness-Based",
                difficulty: "Easy-Medium",
                duration: "10-20 minutes",
                evidenceLevel: "High - Mindfulness research",
                steps: [
                    "Lie in bed, eyes closed, comfortable position",
                    "Start with toes: notice sensation, imagine warmth/heaviness, relax",
                    "Slowly move up: feet, calves, knees, thighs, hips, etc.",
                    "For each body part: notice, relax, release tension",
                    "Continue through entire body to top of head",
                    "If mind wanders, gently return to body scan",
                    "After full scan, notice whole body relaxed"
                ],
                science: "Shifts attention from thoughts to physical sensations. Reduces arousal. Teaches body to recognize and release tension. Often leads to sleep before completion.",
                whenToUse: "Physical tension, racing mind, bedtime routine"
            }
        ]
    },

    // SLEEP EDUCATION
    education: {
        whatIsIt: "Insomnia is persistent difficulty falling asleep, staying asleep, or waking too early, resulting in daytime impairment. Chronic insomnia (3+ nights/week for 3+ months) affects 10-15% of adults.",
        
        types: [
            "Sleep Onset Insomnia - Can't fall asleep initially",
            "Sleep Maintenance Insomnia - Waking during night, can't return to sleep",
            "Early Morning Awakening - Waking 2+ hours before desired, can't sleep again",
            "Mixed Insomnia - Combination of above"
        ],
        
        quickTips: [
            "Consistent wake time is THE most important thing - more than any other intervention",
            "20-minute rule: Not asleep in 20 minutes? Get up. No exceptions.",
            "Bed is for sleep and sex ONLY. Train your brain: bed = sleep.",
            "Stop trying to sleep. Paradoxically, trying harder makes insomnia worse.",
            "Melatonin helps with circadian issues (jet lag, shift work) but not insomnia alone",
            "Exercise improves sleep but not within 3 hours of bedtime",
            "Napping undermines nighttime sleep - avoid or limit to 20 min before 2pm"
        ]
    },

    // SLEEP RESOURCES
    resources: {
        apps: [
            "Sleepio - CBT-I program, clinically validated",
            "CBT-i Coach - Free, from VA/Stanford, evidence-based",
            "Calm - Meditations, sleep stories, relaxation",
            "Insight Timer - Free meditations, body scans"
        ],
        
        helplines: [
            {
                name: "Kiran Mental Health Helpline",
                number: "1800-599-0019",
                availability: "24/7",
                note: "For mental health issues contributing to insomnia (anxiety, depression)"
            }
        ]
    }
};


//CHUNK 6//

// ========== MODULE 4: LONELINESS & SOCIAL CONNECTION ==========

const LONELINESS_MODULE = {
    name: "Loneliness & Social Connection",
    icon: "😞",
    
    // KEYWORD RECOGNITION
    keywords: {
        primary: [
            'lonely', 'loneliness', 'alone', 'isolated', 'isolation',
            'no friends', 'nobody cares', 'friendless', 'abandoned',
            'left out', 'disconnected', 'by myself', 'solitude'
        ],
        
        contextual: [
            'everyone has someone', 'always by myself', 'eating alone',
            'no one to talk to', 'weekends alone', 'holidays alone',
            'everyone else has plans', 'third wheel', 'fifth wheel',
            'watching everyone else', 'scrolling social media alone'
        ],
        
        emotional: [
            'outcast', 'rejected', 'excluded', 'invisible', 'forgotten',
            'no one understands', 'don\'t belong', 'outsider', 'unwanted',
            'left behind', 'pushed away'
        ]
    },

    // RESPONSES
    responses: [
        "Loneliness is painful, and I'm glad you're reaching out. Social connection is a fundamental human need. Even small interactions can help. When's the last time you connected with someone?",
        
        "Feeling alone is one of the hardest experiences. But here's something important: loneliness doesn't mean you're unlovable or unwanted. Often it's about the quality of connections, not quantity.",
        
        "I hear you. Loneliness can feel overwhelming, especially in a connected world. Let's talk about small steps to build meaningful connections.",
        
        "Social isolation affects mental and physical health—it's as harmful as smoking 15 cigarettes a day according to research. But connection can be rebuilt, even if it feels impossible right now."
    ],

    // TECHNIQUES
    techniques: [
        {
            name: "Micro-Connection Challenge",
            difficulty: "Easy → Medium",
            duration: "Gradual progression",
            steps: [
                "Day 1: Make eye contact and smile at 1 person",
                "Day 2-3: Say 'hi' or 'good morning' to someone",
                "Day 4-5: Make a brief comment (weather, nice shirt, etc.)",
                "Week 2: Have a 2-minute conversation",
                "Week 3: Ask someone a question about themselves",
                "Build gradually - small steps compound"
            ],
            science: "Reduces social anxiety through gradual exposure. Each small interaction builds confidence and social skills.",
            whenToUse: "Social anxiety, lack of practice, feeling disconnected"
        },
        
        {
            name: "Reach Out Challenge",
            difficulty: "Medium",
            duration: "5-10 minutes",
            steps: [
                "Text or message one person: 'Hi, thinking of you. How are you?'",
                "Don't wait for them to reach out first",
                "Send to someone you haven't talked to in a while",
                "No expectations - just reaching out",
                "Do this once a week minimum"
            ],
            science: "Most people appreciate being thought of. Research shows people underestimate how much others want to hear from them by 50%.",
            whenToUse: "Feeling forgotten, believing no one cares, isolation"
        },
        
        {
            name: "Join Something (The 3-Session Rule)",
            difficulty: "Medium-Hard",
            duration: "Ongoing commitment",
            steps: [
                "Find ONE group/class/volunteer opportunity related to interests",
                "Commit to attending 3 sessions before deciding to quit",
                "First session is awkward for everyone - push through",
                "Show up consistently - familiarity breeds connection",
                "Talk to one new person each time (even brief)",
                "Options: Book club, sports team, volunteer org, hobby class, religious/spiritual group"
            ],
            science: "Repeated exposure builds familiarity and trust. Research shows it takes 50 hours to become casual friends, 90 hours for real friends, 200+ for close friends.",
            whenToUse: "Chronic loneliness, need structured social interaction, wanting community"
        },
        
        {
            name: "Quality Over Quantity",
            difficulty: "Medium",
            concept: "Deep meaningful connections matter more than many superficial ones",
            steps: [
                "Identify 1-3 people you'd like to be closer to",
                "Suggest doing something together (coffee, walk, activity)",
                "Ask deeper questions: 'What's been on your mind lately?' instead of 'How are you?'",
                "Share something vulnerable about yourself (appropriate level)",
                "Be consistent - connection takes time and repetition"
            ],
            science: "Loneliness often results from lack of intimate connection, not lack of people. Vulnerability builds trust and closeness.",
            whenToUse: "Feeling lonely despite having acquaintances, surface-level relationships"
        }
    ],

    // RESOURCES
    resources: [
        "💬 Online communities: Reddit communities, Discord servers, hobby forums",
        "🤝 Volunteer opportunities: NGOs, animal shelters, teaching, elderly care",
        "🎯 Interest-based groups: Meetup.com, hobby clubs, sports leagues",
        "📱 Apps: Bumble BFF (friendship), Meetup, Friender",
        "🆘 iCall: +91-9152987821 (Emotional support)"
    ]
};

// ========== MODULE 5: MOTIVATION & PRODUCTIVITY ==========

const MOTIVATION_MODULE = {
    name: "Motivation & Productivity Support",
    icon: "💪",
    
    // KEYWORD RECOGNITION
    keywords: {
        primary: [
            'unmotivated', 'no motivation', 'motivation', 'motivate',
            'lazy', 'laziness', 'procrastinating', 'procrastination',
            'can\'t focus', 'distracted', 'distractions', 'giving up'
        ],
        
        secondary: [
            'burnout', 'burnt out', 'burned out', 'exhausted', 'overwhelmed',
            'no energy', 'tired', 'don\'t care', 'what\'s the point',
            'stuck', 'aimless', 'lost direction', 'no goals', 'purposeless'
        ],
        
        productivity: [
            'can\'t get anything done', 'wasting time', 'unproductive',
            'behind schedule', 'deadline', 'procrastinating', 'avoiding work',
            'can\'t start', 'paralyzed', 'decision fatigue'
        ]
    },

    // RESPONSES
    responses: [
        "Lack of motivation often isn't laziness—it's your brain protecting you from overwhelm, or a sign you need rest. Let's figure out what's really going on. Burnout or lack of direction?",
        
        "Motivation doesn't come before action—it comes after. Even tiny actions can restart your motivation engine. Want to try the 2-minute rule?",
        
        "Feeling stuck happens to everyone. Sometimes the goal isn't to feel motivated, but to take action anyway. Let's break this down into micro-steps.",
        
        "Procrastination is often perfectionism or fear in disguise. We avoid starting because we're afraid we'll fail or it won't be good enough. Let's tackle that."
    ],

    // TECHNIQUES
    techniques: [
        {
            name: "2-Minute Rule",
            category: "Starting Technique",
            difficulty: "Easy",
            duration: "2 minutes minimum",
            evidenceLevel: "High - Behavioral psychology",
            steps: [
                "Commit to doing the task for JUST 2 minutes",
                "Set a timer",
                "Start - no judgment on quality",
                "When timer goes off, you can stop (but usually you'll continue)",
                "Starting is the hardest part - momentum builds naturally"
            ],
            science: "Overcoming activation energy. Once started, continuation is easier. Reduces psychological resistance.",
            whenToUse: "Procrastination, can't start, overwhelmed by large tasks"
        },
        
        {
            name: "Tiny Habits Method",
            category: "Behavior Change",
            difficulty: "Easy",
            duration: "30 seconds to start",
            evidenceLevel: "High - Stanford Behavior Lab",
            steps: [
                "Pick the smallest possible version of your goal",
                "Examples: Want to exercise? Put on shoes. Want to study? Open the book. Want to clean? Pick up 1 item.",
                "Do ONLY the tiny version for 3 days",
                "Gradually expand once habit is automatic",
                "Celebrate immediately after ('Yes! I did it!')"
            ],
            science: "Builds neural pathways through repetition. Removes intimidation factor. Success breeds motivation.",
            whenToUse: "Building new habits, overcoming resistance, feeling overwhelmed"
        },
        
        {
            name: "Pomodoro Technique",
            category: "Focus & Time Management",
            difficulty: "Easy-Medium",
            duration: "25-minute work blocks",
            evidenceLevel: "High - Time management research",
            steps: [
                "Set timer for 25 minutes",
                "Work with full focus (no phone, no distractions)",
                "When timer rings, take 5-minute break",
                "Repeat 4 times",
                "After 4 pomodoros, take longer 15-30 min break"
            ],
            science: "Brain works best in focused bursts. Knowing break is coming reduces resistance. Prevents burnout.",
            whenToUse: "Can't focus, easily distracted, large projects, studying"
        },
        
        {
            name: "Eat the Frog",
            category: "Priority Management",
            difficulty: "Medium",
            duration: "Varies",
            concept: "Do your hardest/most important task first thing in the morning",
            steps: [
                "Identify your 'frog' - the task you're most avoiding",
                "Do it FIRST thing in the morning (before checking phone/email)",
                "Don't allow yourself to do easier tasks first",
                "Rest of day feels easier by comparison",
                "Build momentum from early win"
            ],
            science: "Willpower is highest in morning. Completing hard task early provides sense of accomplishment that fuels rest of day.",
            whenToUse: "Avoiding important tasks, procrastinating on hard work"
        },
        
        {
            name: "Energy Management (Not Time Management)",
            category: "Productivity Strategy",
            difficulty: "Medium",
            steps: [
                "Track your energy levels throughout day for 1 week",
                "Identify your high-energy times (usually morning)",
                "Schedule hardest/most important work during high-energy periods",
                "Use low-energy times for easier tasks (emails, organizing)",
                "Protect your peak performance time - no meetings, no distractions",
                "Match task difficulty to energy level"
            ],
            science: "Working with your natural energy cycles is more effective than forcing productivity. Circadian rhythms affect cognitive performance.",
            whenToUse: "Chronic low motivation, burnout, poor productivity despite effort"
        }
    ],

    // RESOURCES
    resources: [
        "📱 Forest App - Focus timer with gamification (plant trees by staying focused)",
        "📱 Habitica - Gamify your habits (RPG-style task manager)",
        "📱 Focusmate - Virtual coworking (accountability partner)",
        "📚 'Atomic Habits' by James Clear - Habit formation science",
        "📚 'Eat That Frog' by Brian Tracy - Overcoming procrastination"
    ]
};


//CHUNK 7

// ========== FALLBACK & GENERAL RESPONSES ==========

const GENERAL_RESPONSES = {
    // GREETING RESPONSES
    greetings: [
        "Hello! I'm MindCare, your mental health support assistant. I'm here to listen and help. How are you feeling today?",
        
        "Hi there! Thank you for reaching out. I'm here to support you with anxiety, depression, stress, sleep issues, or just to listen. What's on your mind?",
        
        "Welcome! I'm MindCare. Whether you're anxious, sad, stressed, lonely, or just need to talk—I'm here. How can I help you today?",
        
        "Hey! I'm glad you're here. This is a safe, judgment-free space. Whatever you're feeling, I'm here to support you. What's been going on?"
    ],

    // FALLBACK RESPONSES (when intent unclear)
    fallbacks: [
        "I want to help, but I'm not sure I fully understand. Could you tell me more about what you're feeling right now?",
        
        "I'm here to listen. What's been weighing on your mind?",
        
        "Can you help me understand better—are you feeling anxious, sad, lonely, stressed, or something else?",
        
        "I'm an AI support tool, so I might not catch everything. Could you rephrase what you're experiencing?",
        
        "I'm here for you. Let's try this: On a scale of 1-10, how are you feeling right now? And what emotion describes it best?",
        
        "Thank you for sharing. To help you better, could you describe what's troubling you? For example: worried thoughts, low mood, can't sleep, feeling alone, or something else?"
    ],

    // THANK YOU RESPONSES
    thanks: [
        "You're welcome! I'm here whenever you need support. Remember, reaching out is a sign of strength. Take care! 💙",
        
        "I'm glad I could help! Don't hesitate to come back anytime. You're not alone in this. 🌟",
        
        "You're very welcome. Remember: healing isn't linear, and it's okay to ask for help. I'm here whenever you need me. 💚",
        
        "Happy to help! Please reach out again if you need anything. Taking care of your mental health is important, and you're doing great by being here. ✨"
    ],

    // GOODBYE RESPONSES
    goodbyes: [
        "Take care of yourself. Remember, I'm here 24/7 if you need to talk again. You've got this! 💪",
        
        "Goodbye for now! I'm always here when you need support. Don't hesitate to reach out. Stay safe! 🌈",
        
        "Thank you for trusting me with your feelings. I hope things get better. Come back anytime! 💙"
    ],

    // POSITIVE CHECK-IN RESPONSES
    positiveCheckIn: [
        "I'm so glad to hear you're doing well! That's wonderful. Remember, I'm here if things ever feel tough. What's been going well for you?",
        
        "That's great to hear! It's important to acknowledge when things are going okay. Keep taking care of yourself! 🌟",
        
        "I'm happy you're feeling good! If you ever need support in the future, I'm always here. Wishing you continued well-being! ✨"
    ],

    // CLARIFICATION PROMPTS
    clarifications: [
        "I hear that you're struggling. To help you better, could you describe your main concern right now?",
        
        "It sounds like you're going through a difficult time. What would be most helpful for you right now—coping techniques, resources, or just someone to listen?",
        
        "I want to make sure I understand. Are you experiencing: anxiety/worry, sadness/depression, sleep problems, loneliness, or low motivation? Or something else?"
    ]
};

// ========== CONVERSATION CONTEXT MANAGEMENT ==========

const CONVERSATION_CONTEXT = {
    currentTopic: null,
    conversationHistory: [],
    userProfile: {
        previousTopics: [],
        riskLevel: 'low', // low, medium, high, critical
        hasBeenScreenedForCrisis: false,
        preferredResponseStyle: null // empathetic, psychoeducational, technical
    },

    // Add message to history
    addToHistory(role, message, topic = null) {
        this.conversationHistory.push({
            role: role, // 'user' or 'bot'
            message: message,
            topic: topic,
            timestamp: new Date()
        });

        // Keep last 10 messages
        if (this.conversationHistory.length > 10) {
            this.conversationHistory.shift();
        }
    },

    // Track topics discussed
    trackTopic(topic) {
        if (topic && !this.userProfile.previousTopics.includes(topic)) {
            this.userProfile.previousTopics.push(topic);
        }
        this.currentTopic = topic;
    },

    // Update risk level
    updateRiskLevel(level) {
        this.userProfile.riskLevel = level;
    },

    // Get conversation summary
    getSummary() {
        return {
            messageCount: this.conversationHistory.length,
            currentTopic: this.currentTopic,
            topicsDiscussed: this.userProfile.previousTopics,
            riskLevel: this.userProfile.riskLevel
        };
    },

    // Reset conversation
    reset() {
        this.currentTopic = null;
        this.conversationHistory = [];
        this.userProfile = {
            previousTopics: [],
            riskLevel: 'low',
            hasBeenScreenedForCrisis: false,
            preferredResponseStyle: null
        };
    }
};

// ========== GREETING & GOODBYE DETECTION ==========

const GREETING_KEYWORDS = [
    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
    'greetings', 'howdy', 'hola', 'namaste', 'sup', 'what\'s up', 'yo'
];

const GOODBYE_KEYWORDS = [
    'bye', 'goodbye', 'good bye', 'see you', 'see ya', 'later', 'gotta go',
    'have to go', 'leaving', 'talk later', 'thanks bye', 'thank you bye'
];

const THANKS_KEYWORDS = [
    'thank', 'thanks', 'thank you', 'thx', 'appreciate', 'grateful',
    'helped', 'helpful', 'that helps', 'that helped'
];

const POSITIVE_KEYWORDS = [
    'good', 'great', 'fine', 'okay', 'ok', 'well', 'happy', 'better',
    'improving', 'feeling better', 'doing well', 'doing good', 'not bad'
];

// ========== DETECTION HELPER FUNCTIONS ==========

function isGreeting(message) {
    const lowerMsg = message.toLowerCase().trim();
    // Check if message starts with greeting or is only a greeting
    return GREETING_KEYWORDS.some(greeting => 
        lowerMsg.startsWith(greeting) || lowerMsg === greeting
    );
}

function isGoodbye(message) {
    const lowerMsg = message.toLowerCase().trim();
    return GOODBYE_KEYWORDS.some(goodbye => lowerMsg.includes(goodbye));
}

function isThanks(message) {
    const lowerMsg = message.toLowerCase().trim();
    return THANKS_KEYWORDS.some(thanks => lowerMsg.includes(thanks));
}

function isPositiveCheckIn(message) {
    const lowerMsg = message.toLowerCase().trim();
    // Must contain positive keyword and be asking how they are
    const hasPositive = POSITIVE_KEYWORDS.some(pos => lowerMsg.includes(pos));
    const isCheckIn = message.length < 50; // Short positive response
    return hasPositive && isCheckIn && !lowerMsg.includes('not');
}

// ========== RANDOM RESPONSE SELECTOR ==========

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// ========== TECHNIQUE FORMATTER ==========

function formatTechnique(technique) {
    let formatted = `\n\n**${technique.name}**\n`;
    
    if (technique.duration) {
        formatted += `⏱️ Duration: ${technique.duration}\n`;
    }
    
    if (technique.difficulty) {
        formatted += `📊 Difficulty: ${technique.difficulty}\n`;
    }
    
    if (technique.steps) {
        formatted += `\n**Steps:**\n`;
        technique.steps.forEach((step, index) => {
            formatted += `${index + 1}. ${step}\n`;
        });
    }
    
    if (technique.science) {
        formatted += `\n💡 **Why it works:** ${technique.science}\n`;
    }
    
    if (technique.whenToUse) {
        formatted += `\n✅ **Best for:** ${technique.whenToUse}\n`;
    }
    
    return formatted;
}

// ========== HELPLINE FORMATTER ==========

function formatHelplines(helplines) {
    let formatted = '\n\n📞 **Get Support Now:**\n';
    
    helplines.forEach(helpline => {
        formatted += `\n• **${helpline.name}**\n`;
        formatted += `  📱 ${helpline.number}\n`;
        
        if (helpline.whatsapp) {
            formatted += `  💬 WhatsApp: ${helpline.whatsapp}\n`;
        }
        
        if (helpline.availability) {
            formatted += `  🕒 ${helpline.availability}\n`;
        }
        
        if (helpline.languages) {
            formatted += `  🗣️ ${helpline.languages}\n`;
        }
        
        if (helpline.free) {
            formatted += `  ✅ Free service\n`;
        }
    });
    
    return formatted;
}


//CHUNK 8

// ============================================================================
// PART III: CONVERSATIONAL LOGIC ENGINE
// ============================================================================

// ========== CRISIS DETECTION FUNCTION (3-TIER SYSTEM) ==========

function detectCrisis(message) {
    const lowerMsg = message.toLowerCase();
    
    // LEVEL 1: IMMEDIATE DANGER - Suicide/Life-Threatening (HIGHEST PRIORITY)
    for (let keyword of CRISIS_LEVEL1_KEYWORDS) {
        if (lowerMsg.includes(keyword)) {
            CONVERSATION_CONTEXT.updateRiskLevel('critical');
            return {
                isCrisis: true,
                level: 1,
                severity: 'CRITICAL',
                response: CRISIS_RESPONSES.emergencyLevel1.message,
                actions: CRISIS_RESPONSES.emergencyLevel1.actions,
                showEmergencyOverlay: true,
                requiresImmediateIntervention: true
            };
        }
    }
    
    // LEVEL 2: SELF-HARM - Immediate Risk
    for (let keyword of CRISIS_LEVEL2_KEYWORDS) {
        if (lowerMsg.includes(keyword)) {
            CONVERSATION_CONTEXT.updateRiskLevel('high');
            return {
                isCrisis: true,
                level: 2,
                severity: 'HIGH',
                response: CRISIS_RESPONSES.emergencyLevel2.message,
                actions: CRISIS_RESPONSES.emergencyLevel2.actions,
                showEmergencyOverlay: true,
                requiresImmediateIntervention: true
            };
        }
    }
    
    // LEVEL 3: SEVERE DISTRESS - High Risk
    for (let keyword of CRISIS_LEVEL3_KEYWORDS) {
        if (lowerMsg.includes(keyword)) {
            CONVERSATION_CONTEXT.updateRiskLevel('medium-high');
            return {
                isCrisis: true,
                level: 3,
                severity: 'MEDIUM-HIGH',
                response: CRISIS_RESPONSES.emergencyLevel3.message,
                actions: CRISIS_RESPONSES.emergencyLevel3.actions,
                showEmergencyOverlay: false,
                requiresImmediateIntervention: false
            };
        }
    }
    
    // No crisis detected
    return { 
        isCrisis: false,
        level: 0,
        severity: 'LOW'
    };
}

// ========== INTENT DETECTION FUNCTION ==========

function detectIntent(message) {
    const lowerMsg = message.toLowerCase();
    
    // Initialize match scores for each topic
    let matchScores = {
        anxiety: 0,
        depression: 0,
        sleep: 0,
        loneliness: 0,
        motivation: 0
    };
    
    // ANXIETY MATCHING
    // Check primary keywords
    ANXIETY_MODULE.keywords.primary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.anxiety += 3;
    });
    
    // Check secondary keywords
    ANXIETY_MODULE.keywords.secondary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.anxiety += 2;
    });
    
    // Check behavioral keywords
    ANXIETY_MODULE.keywords.behavioral.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.anxiety += 2;
    });
    
    // Check questions
    ANXIETY_MODULE.keywords.questions.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.anxiety += 3;
    });
    
    // Check slang
    ANXIETY_MODULE.keywords.slang.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.anxiety += 1;
    });
    
    // DEPRESSION MATCHING
    // Check primary keywords
    DEPRESSION_MODULE.keywords.primary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 3;
    });
    
    // Check secondary keywords
    DEPRESSION_MODULE.keywords.secondary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 2;
    });
    
    // Check cognitive keywords
    DEPRESSION_MODULE.keywords.cognitive.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 2;
    });
    
    // Check severe keywords (higher weight)
    DEPRESSION_MODULE.keywords.severe.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 4;
    });
    
    // Check questions
    DEPRESSION_MODULE.keywords.questions.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 3;
    });
    
    // Check slang
    DEPRESSION_MODULE.keywords.slang.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.depression += 1;
    });
    
    // SLEEP MATCHING
    // Check primary keywords
    SLEEP_MODULE.keywords.primary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.sleep += 3;
    });
    
    // Check secondary keywords
    SLEEP_MODULE.keywords.secondary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.sleep += 2;
    });
    
    // Check descriptive keywords
    SLEEP_MODULE.keywords.descriptive.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.sleep += 2;
    });
    
    // Check questions
    SLEEP_MODULE.keywords.questions.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.sleep += 3;
    });
    
    // LONELINESS MATCHING
    // Check primary keywords
    LONELINESS_MODULE.keywords.primary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.loneliness += 3;
    });
    
    // Check contextual keywords
    LONELINESS_MODULE.keywords.contextual.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.loneliness += 2;
    });
    
    // Check emotional keywords
    LONELINESS_MODULE.keywords.emotional.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.loneliness += 2;
    });
    
    // MOTIVATION MATCHING
    // Check primary keywords
    MOTIVATION_MODULE.keywords.primary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.motivation += 3;
    });
    
    // Check secondary keywords
    MOTIVATION_MODULE.keywords.secondary.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.motivation += 2;
    });
    
    // Check productivity keywords
    MOTIVATION_MODULE.keywords.productivity.forEach(keyword => {
        if (lowerMsg.includes(keyword)) matchScores.motivation += 2;
    });
    
    // Find highest scoring topic
    let maxScore = 0;
    let detectedIntent = null;
    
    for (let [intent, score] of Object.entries(matchScores)) {
        if (score > maxScore) {
            maxScore = score;
            detectedIntent = intent;
        }
    }
    
    // Return intent only if score is above threshold (minimum 2 matches)
    if (maxScore >= 2) {
        CONVERSATION_CONTEXT.trackTopic(detectedIntent);
        return {
            intent: detectedIntent,
            confidence: maxScore,
            allScores: matchScores
        };
    }
    
    return {
        intent: null,
        confidence: 0,
        allScores: matchScores
    };
}

// ========== RESPONSE GENERATION FUNCTION ==========

// ========== RESPONSE GENERATION FUNCTION (SHORTER VERSION) ==========
function generateResponse(intent) {
    let responseText = '';
    
    switch(intent) {
        case 'anxiety':
            // Short empathetic response
            responseText = getRandomResponse(ANXIETY_MODULE.responses.empathetic);
            
            // Add ONE simple technique (just name and steps, no extra details)
            responseText += '\n\n**Try this quick technique:**\n\n';
            responseText += '**5-4-3-2-1 Grounding**\n';
            responseText += '1. Name 5 things you SEE\n';
            responseText += '2. 4 things you can TOUCH\n';
            responseText += '3. 3 things you HEAR\n';
            responseText += '4. 2 things you SMELL\n';
            responseText += '5. 1 thing you TASTE\n';
            responseText += '\n💡 This helps calm your nervous system in 2-3 minutes.';
            
            // Just mention helpline availability (don't list all)
            responseText += '\n\n📞 Need immediate support? Reply "helpline" for crisis numbers.';
            
            break;
            
        case 'depression':
            // Short validation response
            responseText = getRandomResponse(DEPRESSION_MODULE.responses.validation);
            
            // Safety check (shorter)
            if (!CONVERSATION_CONTEXT.userProfile.hasBeenScreenedForCrisis) {
                responseText += '\n\nBefore we continue, are you having thoughts of harming yourself? Your safety matters most.';
                CONVERSATION_CONTEXT.userProfile.hasBeenScreenedForCrisis = true;
            } else {
                // Add ONE simple activity suggestion
                responseText += '\n\n**Small step for today:**\n';
                responseText += 'Pick ONE tiny thing:\n';
                responseText += '• Open curtains for 30 seconds\n';
                responseText += '• Drink a glass of water\n';
                responseText += '• Text one person\n';
                responseText += '\nNo pressure. Just one small action.';
            }
            
            responseText += '\n\n📞 Need support now? Reply "helpline" for immediate help.';
            
            break;
            
        case 'sleep':
            // Short empathetic response
            responseText = getRandomResponse(SLEEP_MODULE.responses.empathetic);
            
            // One simple tip
            responseText += '\n\n**Tonight, try this:**\n';
            responseText += '10-3-2-1-0 Sleep Rule:\n';
            responseText += '• 10 hours before: No caffeine\n';
            responseText += '• 3 hours before: No big meals\n';
            responseText += '• 2 hours before: No work\n';
            responseText += '• 1 hour before: No screens\n';
            responseText += '• 0 distractions in bedroom';
            
            responseText += '\n\n💤 Start with just ONE of these tonight.';
            
            break;
            
        case 'loneliness':
            // Short response
            responseText = getRandomResponse(LONELINESS_MODULE.responses);
            
            // Simple suggestion
            responseText += '\n\n**Micro-connection idea:**\n';
            responseText += '• Smile at someone today\n';
            responseText += '• Text an old friend\n';
            responseText += '• Comment on a social post\n';
            responseText += '• Join an online community\n';
            responseText += '\nSmall connections count too. 💙';
            
            break;
            
        case 'motivation':
            // Short response
            responseText = getRandomResponse(MOTIVATION_MODULE.responses);
            
            // 2-minute rule
            responseText += '\n\n**2-Minute Rule:**\n';
            responseText += 'Commit to doing something for JUST 2 minutes.\n';
            responseText += 'Usually, starting is the hardest part.\n';
            responseText += '\nWhat can you do for 2 minutes right now?';
            
            break;
            
        default:
            // No specific intent detected - use fallback
            responseText = getRandomResponse(GENERAL_RESPONSES.fallbacks);
    }
    
    return responseText;
}


//CHUNK 9//

// ========== MAIN MESSAGE PROCESSING FUNCTION ==========

function processMessage(userMessage) {
    // Add user message to conversation history
    CONVERSATION_CONTEXT.addToHistory('user', userMessage);
    
    // STEP 1: CRISIS DETECTION (Highest Priority - Always First)
    const crisisResult = detectCrisis(userMessage);
    
    if (crisisResult.isCrisis) {
        // Log crisis event
        console.log(`[CRISIS DETECTED] Level ${crisisResult.level} - ${crisisResult.severity}`);
        
        // Show emergency overlay if needed
        if (crisisResult.showEmergencyOverlay) {
            showEmergencyOverlay(crisisResult.level);
        }
        
        // Add bot response to history
        CONVERSATION_CONTEXT.addToHistory('bot', crisisResult.response, 'crisis');
        
        return {
            response: crisisResult.response,
            type: 'crisis',
            level: crisisResult.level,
            showOverlay: crisisResult.showEmergencyOverlay
        };
    }
    
    // STEP 2: GREETING DETECTION
    if (isGreeting(userMessage)) {
        const greetingResponse = getRandomResponse(GENERAL_RESPONSES.greetings);
        CONVERSATION_CONTEXT.addToHistory('bot', greetingResponse, 'greeting');
        
        return {
            response: greetingResponse,
            type: 'greeting'
        };
    }
    
    // STEP 3: GOODBYE DETECTION
    if (isGoodbye(userMessage)) {
        const goodbyeResponse = getRandomResponse(GENERAL_RESPONSES.goodbyes);
        CONVERSATION_CONTEXT.addToHistory('bot', goodbyeResponse, 'goodbye');
        
        return {
            response: goodbyeResponse,
            type: 'goodbye'
        };
    }
    
    // STEP 4: THANKS DETECTION
    if (isThanks(userMessage)) {
        const thanksResponse = getRandomResponse(GENERAL_RESPONSES.thanks);
        CONVERSATION_CONTEXT.addToHistory('bot', thanksResponse, 'thanks');
        
        return {
            response: thanksResponse,
            type: 'thanks'
        };
    }
    
    // STEP 5: POSITIVE CHECK-IN DETECTION
    if (isPositiveCheckIn(userMessage)) {
        const positiveResponse = getRandomResponse(GENERAL_RESPONSES.positiveCheckIn);
        CONVERSATION_CONTEXT.addToHistory('bot', positiveResponse, 'positive');
        
        return {
            response: positiveResponse,
            type: 'positive'
        };
    }
    
    // STEP 6: INTENT DETECTION & RESPONSE GENERATION
    const intentResult = detectIntent(userMessage);
    
    if (intentResult.intent) {
        const response = generateResponse(intentResult.intent);
        CONVERSATION_CONTEXT.addToHistory('bot', response, intentResult.intent);
        
        return {
            response: response,
            type: 'intent',
            intent: intentResult.intent,
            confidence: intentResult.confidence
        };
    }
    
    // STEP 7: FALLBACK (No Intent Detected)
    const fallbackResponse = getRandomResponse(GENERAL_RESPONSES.fallbacks);
    CONVERSATION_CONTEXT.addToHistory('bot', fallbackResponse, 'fallback');
    
    return {
        response: fallbackResponse,
        type: 'fallback'
    };
}

// ============================================================================
// PART IV: UI INTEGRATION & EVENT HANDLERS
// ============================================================================

// ========== DOM ELEMENTS ==========
let chatMessages;
let userInput;
let sendButton;
let emergencyOverlay;
let typingIndicator;

// ========== INITIALIZE CHATBOT ==========
function initializeChatbot() {
    // Get DOM elements
    chatMessages = document.getElementById('chatMessages');
    userInput = document.getElementById('userInput');
    sendButton = document.getElementById('sendButton');
    emergencyOverlay = document.getElementById('emergencyOverlay');
    
    // Create typing indicator if doesn't exist
    createTypingIndicator();
    
    // Event listeners
    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });
        
        // Auto-resize textarea as user types
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Show initial disclaimer
    showInitialDisclaimer();
    
    console.log('[MindCare Chatbot] Initialized successfully');
}

// ========== CREATE TYPING INDICATOR ==========
function createTypingIndicator() {
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing-indicator';
    typingIndicator.style.display = 'none';
    typingIndicator.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    if (chatMessages) {
        chatMessages.appendChild(typingIndicator);
    }
}

// ========== SHOW TYPING INDICATOR ==========
function showTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }
}

// ========== HIDE TYPING INDICATOR ==========
function hideTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

// ========== SHOW INITIAL DISCLAIMER ==========
function showInitialDisclaimer() {
    const disclaimerHTML = `
        <div class="disclaimer-modal" id="disclaimerModal">
            <div class="disclaimer-content">
                <h2>${INITIAL_DISCLAIMER.title}</h2>
                <div class="disclaimer-text">
                    ${INITIAL_DISCLAIMER.message}
                </div>
                <button class="disclaimer-button" onclick="acceptDisclaimer()">
                    ${INITIAL_DISCLAIMER.acceptance}
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', disclaimerHTML);
}

// ========== ACCEPT DISCLAIMER ==========
function acceptDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        modal.remove();
    }
    
    // Show welcome message
    setTimeout(() => {
        displayBotMessage(getRandomResponse(GENERAL_RESPONSES.greetings));
    }, 300);
}

// ========== HANDLE SEND MESSAGE ==========
function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Display user message
    displayUserMessage(message);
    
    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message (simulate delay for natural feel)
    setTimeout(() => {
        const result = processMessage(message);
        
        // Hide typing indicator
        hideTypingIndicator();
        
        // Display bot response
        displayBotMessage(result.response, result.type);
        
        // Handle special cases
        if (result.showOverlay) {
            showEmergencyOverlay(result.level);
        }
    }, 800 + Math.random() * 800); // Random delay 800-1600ms for natural feel
}

// ========== DISPLAY USER MESSAGE ==========
// ========== DISPLAY USER MESSAGE ==========
function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-wrapper user-message-wrapper';
    messageDiv.innerHTML = `
        <div class="message user-message">
            <div class="message-avatar">
                <span>👤</span>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    ${escapeHtml(message)}
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// ========== DISPLAY BOT MESSAGE ==========
// ========== DISPLAY BOT MESSAGE ==========
function displayBotMessage(message, type = 'normal') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-wrapper bot-message-wrapper ${type === 'crisis' ? 'crisis-message' : ''}`;
    
    // Convert markdown-style formatting to HTML
    const formattedMessage = formatMessageToHTML(message);
    
    messageDiv.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">
                <span class="bot-emoji">🧠</span>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    ${formattedMessage}
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}


// ========== FORMAT MESSAGE TO HTML ==========
function formatMessageToHTML(message) {
    // Escape HTML first
    let formatted = escapeHtml(message);
    
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert bullet points (• or -)
    formatted = formatted.replace(/^[•\-]\s+(.+)$/gm, '<li>$1</li>');
    
    // Wrap lists in <ul>
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }
    
    return formatted;
}

// ========== SHOW EMERGENCY OVERLAY ==========
function showEmergencyOverlay(level) {
    if (!emergencyOverlay) {
        // Create emergency overlay if doesn't exist
        emergencyOverlay = document.createElement('div');
        emergencyOverlay.id = 'emergencyOverlay';
        emergencyOverlay.className = 'emergency-overlay';
        document.body.appendChild(emergencyOverlay);
    }
    
    let title = '';
    let content = '';
    
    if (level === 1) {
        title = '🚨 Emergency Support Needed';
        content = `
            <p><strong>Your safety is the priority. Please reach out for immediate help:</strong></p>
            <div class="emergency-contacts">
                <div class="emergency-contact">
                    <strong>📞 Emergency Services</strong><br>
                    <a href="tel:112" class="emergency-number">112</a>
                </div>
                <div class="emergency-contact">
                    <strong>📞 Vandrevala Foundation</strong><br>
                    <a href="tel:9999666555" class="emergency-number">9999-666-555</a><br>
                    <small>24/7 Crisis Support</small>
                </div>
                <div class="emergency-contact">
                    <strong>📞 AASRA</strong><br>
                    <a href="tel:912227546669" class="emergency-number">91-22-27546669</a><br>
                    <small>24/7 Suicide Prevention</small>
                </div>
            </div>
            <p><strong>You are not alone. Your life has value.</strong></p>
        `;
    } else if (level === 2) {
        title = '🆘 Immediate Support Available';
        content = `
            <p><strong>Please reach out for support right now:</strong></p>
            <div class="emergency-contacts">
                <div class="emergency-contact">
                    <strong>📞 Vandrevala Foundation</strong><br>
                    <a href="tel:9999666555" class="emergency-number">9999-666-555</a><br>
                    <small>24/7 Free Support</small>
                </div>
                <div class="emergency-contact">
                    <strong>📞 iCall</strong><br>
                    <a href="tel:919152987821" class="emergency-number">+91-9152987821</a><br>
                    <small>Mon-Sat, 8am-10pm</small>
                </div>
            </div>
        `;
    }
    
    emergencyOverlay.innerHTML = `
        <div class="emergency-content">
            <h2>${title}</h2>
            ${content}
            <button class="emergency-close" onclick="closeEmergencyOverlay()">Close</button>
        </div>
    `;
    
    emergencyOverlay.style.display = 'flex';
}

// ========== CLOSE EMERGENCY OVERLAY ==========
function closeEmergencyOverlay() {
    if (emergencyOverlay) {
        emergencyOverlay.style.display = 'none';
    }
}


//CHUNK 10//

// ========== SCROLL TO BOTTOM ==========
function scrollToBottom() {
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ========== GET CURRENT TIME ==========
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
}

// ========== ESCAPE HTML (Security) ==========
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== CLEAR CHAT HISTORY ==========
function clearChatHistory() {
    if (chatMessages) {
        // Remove all messages except typing indicator
        const messages = chatMessages.querySelectorAll('.message:not(.typing-indicator)');
        messages.forEach(msg => msg.remove());
    }
    
    // Reset conversation context
    CONVERSATION_CONTEXT.reset();
    
    // Show fresh greeting
    setTimeout(() => {
        displayBotMessage(getRandomResponse(GENERAL_RESPONSES.greetings));
    }, 300);
    
    console.log('[MindCare] Chat history cleared');
}

// ========== EXPORT CHAT TRANSCRIPT ==========
function exportChatTranscript() {
    const history = CONVERSATION_CONTEXT.conversationHistory;
    
    if (history.length === 0) {
        alert('No conversation to export yet.');
        return;
    }
    
    let transcript = '=== MindCare Chat Transcript ===\n';
    transcript += `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    transcript += '================================\n\n';
    
    history.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'You' : 'MindCare';
        const time = msg.timestamp.toLocaleTimeString();
        transcript += `[${time}] ${role}:\n${msg.message}\n\n`;
    });
    
    transcript += '================================\n';
    transcript += 'Note: This is an AI support tool, not a replacement for professional care.\n';
    
    // Download as text file
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindcare-transcript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('[MindCare] Transcript exported');
}

// ========== QUICK ACTION BUTTONS ==========
function handleQuickAction(action) {
    switch(action) {
        case 'anxiety':
            userInput.value = "I'm feeling anxious and overwhelmed";
            handleSendMessage();
            break;
        case 'depression':
            userInput.value = "I'm feeling depressed and hopeless";
            handleSendMessage();
            break;
        case 'sleep':
            userInput.value = "I can't sleep and need help";
            handleSendMessage();
            break;
        case 'crisis':
            showEmergencyOverlay(1);
            break;
        case 'resources':
            displayBotMessage(formatHelplines(INDIAN_HELPLINES.general));
            break;
        default:
            console.log('Unknown action:', action);
    }
}

// ========== CONVERSATION SUMMARY ==========
function getConversationSummary() {
    const summary = CONVERSATION_CONTEXT.getSummary();
    
    console.log('=== Conversation Summary ===');
    console.log(`Messages: ${summary.messageCount}`);
    console.log(`Current Topic: ${summary.currentTopic || 'None'}`);
    console.log(`Topics Discussed: ${summary.topicsDiscussed.join(', ') || 'None'}`);
    console.log(`Risk Level: ${summary.riskLevel}`);
    console.log('===========================');
    
    return summary;
}

// ========== FEEDBACK COLLECTION ==========
function submitFeedback(rating, comment = '') {
    const feedback = {
        rating: rating,
        comment: comment,
        timestamp: new Date(),
        conversationSummary: CONVERSATION_CONTEXT.getSummary()
    };
    
    // In production, send to backend
    console.log('[Feedback Submitted]', feedback);
    
    // Show thank you message
    displayBotMessage("Thank you for your feedback! It helps us improve our support. 💙");
}

// ========== VOICE INPUT (Optional Future Feature) ==========
function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice input not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        console.log('[Voice] Listening...');
        // Show visual indicator
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        console.log('[Voice] Recognized:', transcript);
    };
    
    recognition.onerror = function(event) {
        console.error('[Voice] Error:', event.error);
    };
    
    recognition.onend = function() {
        console.log('[Voice] Stopped listening');
    };
    
    recognition.start();
}

// ========== ACCESSIBILITY: SCREEN READER ANNOUNCEMENTS ==========
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only'; // Screen reader only
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: Focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (userInput) userInput.focus();
    }
    
    // Ctrl/Cmd + L: Clear chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (confirm('Clear chat history?')) {
            clearChatHistory();
        }
    }
    
    // Ctrl/Cmd + E: Export transcript
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportChatTranscript();
    }
    
    // Escape: Close emergency overlay
    if (e.key === 'Escape') {
        closeEmergencyOverlay();
    }
});

// ========== AUTO-SAVE DRAFT ==========
let draftTimer;
function saveDraft() {
    if (userInput && userInput.value.trim() !== '') {
        localStorage.setItem('mindcare_draft', userInput.value);
    }
}

function loadDraft() {
    const draft = localStorage.getItem('mindcare_draft');
    if (draft && userInput) {
        userInput.value = draft;
    }
}

function clearDraft() {
    localStorage.removeItem('mindcare_draft');
}

// Auto-save every 2 seconds while typing
if (userInput) {
    userInput.addEventListener('input', function() {
        clearTimeout(draftTimer);
        draftTimer = setTimeout(saveDraft, 2000);
    });
}

// ========== PRIVACY: CLEAR DATA ON TAB CLOSE ==========
window.addEventListener('beforeunload', function(e) {
    // Optionally warn user
    if (CONVERSATION_CONTEXT.conversationHistory.length > 5) {
        const confirmationMessage = 'Your conversation will be cleared when you leave. Continue?';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});

// Clear sensitive data when page unloads
window.addEventListener('unload', function() {
    // Clear conversation context (optional - for privacy)
    // CONVERSATION_CONTEXT.reset();
});

// ========== IDLE TIMEOUT (Optional) ==========
let idleTimer;
const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        displayBotMessage("I noticed you've been idle for a while. I'm still here if you need support. Feel free to continue our conversation anytime! 💙");
    }, IDLE_TIMEOUT);
}

// Track user activity
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keypress', resetIdleTimer);

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('[MindCare Error]', e.message, e.filename, e.lineno);
    
    // Show user-friendly error
    displayBotMessage("I encountered a technical issue. Please refresh the page or contact support if this continues. I apologize for the inconvenience.");
});

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🧠 MindCare Mental Health Chatbot', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cVersion 1.0.0', 'color: #7B7B7B; font-size: 12px;');
console.log('%cBuilt with care for mental health support', 'color: #7B7B7B; font-size: 12px;');
console.log('%c⚠️ Privacy Notice: Conversations are temporary and not stored permanently.', 'color: #E94B3C; font-size: 12px;');
console.log('%c---', 'color: #7B7B7B;');

// ========== INITIALIZE ON PAGE LOAD ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    initializeChatbot();
}

// Load draft if exists
window.addEventListener('load', loadDraft);

// ============================================================================
// END OF CHATBOT BRAIN
// ============================================================================

// Make functions globally accessible for HTML onclick handlers
window.acceptDisclaimer = acceptDisclaimer;
window.closeEmergencyOverlay = closeEmergencyOverlay;
window.handleQuickAction = handleQuickAction;
window.clearChatHistory = clearChatHistory;
window.exportChatTranscript = exportChatTranscript;
window.submitFeedback = submitFeedback;
window.startVoiceInput = startVoiceInput;
window.getConversationSummary = getConversationSummary;

console.log('[MindCare] All systems ready. Chatbot fully operational. 🚀');


//CHUNK 11//

