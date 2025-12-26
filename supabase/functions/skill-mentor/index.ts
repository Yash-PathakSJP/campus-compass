import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, skillGaps } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const skillGapsContext = skillGaps && skillGaps.length > 0 
      ? `\n\nUser's current skill gaps: ${skillGaps.map((g: any) => `${g.skill_name} (${g.current_level}% proficiency)`).join(', ')}`
      : '';

    const systemPrompt = `You are an AI Skill Mentor for EduMesh, a college learning platform. Your role is to:

1. **Explain Concepts**: Break down complex topics into simple, understandable parts
2. **Identify Knowledge Gaps**: Analyze what the student knows and what they need to learn
3. **Provide Free Resources**: Always include FREE learning resources like:
   - YouTube tutorials (mention specific channels like freeCodeCamp, CS50, MIT OpenCourseWare)
   - Documentation (official docs, MDN, W3Schools)
   - Free courses (Coursera free audits, Khan Academy, edX)
   - Practice platforms (LeetCode, HackerRank, GeeksforGeeks)
   - Articles and blogs (Medium, Dev.to, tutorials)

4. **Create Study Roadmaps**: Provide step-by-step learning paths
5. **Generate Practice Problems**: Offer exercises tailored to their level

${skillGapsContext}

Format your responses with:
- **Bold** for key concepts
- Bullet points for lists
- Code blocks for examples (use \`\`\` for code)
- Emojis sparingly for engagement (🎯 📚 💡 ✅)

Always be encouraging and supportive. Focus on practical, actionable advice.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Skill mentor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
