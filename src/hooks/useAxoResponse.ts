export function useAxoResponse() {
  const getResponse = async (message: string, context: any) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const msg = message.toLowerCase();
    const type = context?.businessProfile?.business_type || "agency";
    const pulse = context?.scores?.business_pulse || 7.2;

    if (msg.includes("revenue") || msg.includes("mrr")) {
      return `Your revenue stability is strong. However, to hit your 90-day goal, we need to focus on increasing conversion. Your current Business Pulse is ${pulse}/10.`;
    }
    if (msg.includes("risk") || msg.includes("churn")) {
      return type === "agency" 
        ? "Your client dependency is currently MODERATE. Losing your top client would impact 15% of your MRR. Action: Diversify your pipeline this week."
        : "Your repeat purchase rate is dropping. We should implement a win-back email sequence. Action: I've added this to your pipeline.";
    }
    if (msg.includes("hire") || msg.includes("team")) {
      return "Based on your current cash runway and MRR growth, you can safely afford a new hire up to $5,000/mo without impacting your baseline stability.";
    }
    if (msg.includes("pipeline") || msg.includes("leads") || msg.includes("acquisition")) {
      return type === "agency"
        ? "Your pipeline has 4 high-probability deals. If 2 close, you hit your monthly target. Focus on 'Acme Corp' this week."
        : "Your Meta Ads ROAS is 3.5, which is healthy. I recommend scaling budget by 15% on the top performing ad set.";
    }
    
    // Default fallback
    return "I've analyzed that request against your current metrics. To give you the best strategic advice, could you clarify which specific KPI you want to optimize?";
  };

  return { getResponse };
}
