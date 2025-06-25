
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'AI service is not configured. Please contact support.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Making request to OpenAI with messages:', messages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are CampusCrack AI Assistant, a helpful AI specialized in helping students with campus placements, interview preparation, coding problems, resume building, and career guidance. You provide detailed, practical advice for Indian college students preparing for campus placements.

Key areas you help with:
- Interview preparation (technical, HR, behavioral)
- Company-specific insights and tips
- Coding problems and data structures
- Resume and profile building
- Career guidance and placement strategies
- Communication skills improvement
- Specific interview questions and their answers
- Test preparation strategies

Always be encouraging, practical, and provide actionable advice. Keep responses helpful but concise. When discussing specific companies, provide detailed information about their interview process, common questions, salary ranges, and preparation tips.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error (${response.status}):`, errorText);
      
      let errorMessage = 'AI service is temporarily unavailable. Please try again later.';
      
      if (response.status === 429 || errorText.includes('quota') || errorText.includes('insufficient_quota')) {
        errorMessage = 'AI service quota exceeded. Please try again later or contact support.';
      } else if (response.status === 401) {
        errorMessage = 'AI service authentication failed. Please contact support.';
      }
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from OpenAI:', data);
      return new Response(JSON.stringify({ 
        error: 'Invalid response from AI service. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Successfully generated AI response');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.message?.includes('fetch')) {
      errorMessage = 'Network error connecting to AI service. Please check your connection and try again.';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
