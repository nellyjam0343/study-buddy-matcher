/* ==========================================================================
   questions.js — THE QUESTIONS (the one place to change your survey)
   --------------------------------------------------------------------------
   This is the single, obvious config for what people are asked. Swap these
   out and the whole app updates: the sign-up form renders from this list, and
   the matcher scores people by comparing their answers. You do NOT need to
   touch the database or the matching code to change questions.

   THREE KINDS OF QUESTION ARE DEMONSTRATED (one of each is labeled below):
     1. SIMPLE      — pick one from a list (type: "select") or type text.
     2. BRANCHING   — one answer reveals a follow-up question ("branch").
     3. MULTI-SELECT — pick several (type: "multi"); answer is a list.

   Each question object:
     id      — short unique key. Becomes how the answer is stored/compared.
     type    — "select" | "text" | "multi"
     label   — the question shown to the person.
     options — the choices (for "select" and "multi").
     branch  — (optional) { "OptionValue": [ ...follow-up question objects ] }
     scored  — (optional, default true) whether this answer counts toward the
               match score. Set false for free-text you don't want compared.
   ========================================================================== */

window.QUESTIONS = [

  // 1) SIMPLE SELECT — pick one. Same subject = strong overlap in the score.
  {
    id: "subject",
    type: "select",
    label: "What are you studying right now?",
    options: ["Math", "Science", "Coding", "Languages", "Business", "Arts"],
  },

  // A second simple select — when someone likes to study.
  {
    id: "time",
    type: "select",
    label: "When do you focus best?",
    options: ["Early morning", "Daytime", "Evening", "Late night"],
  },

  // 2) BRANCHING — the answer to THIS question reveals a different follow-up.
  //    Pick "In person" and you're asked WHERE. Pick "Online" and you're asked
  //    which PLATFORM. Only the matching follow-up is shown and stored.
  {
    id: "mode",
    type: "select",
    label: "How do you like to study with someone?",
    options: ["In person", "Online"],
    branch: {
      "In person": [
        { id: "campus", type: "text", label: "Which campus or neighborhood?", scored: false },
      ],
      "Online": [
        { id: "platform", type: "select", label: "Preferred platform?", options: ["Zoom", "Discord", "Google Meet"] },
      ],
    },
  },

  // 3) MULTI-SELECT — pick as many as apply. The answer is a LIST, and the
  //    score adds a point for every goal two people share.
  {
    id: "goals",
    type: "multi",
    label: "What do you want from a study buddy? (pick any)",
    options: ["Accountability", "Explaining concepts", "Quiet co-working", "Test prep", "Motivation"],
  },

  // A simple select that ALSO feeds a hard safety rule (see match.js):
  // we never pair a "Casual" person with an "Intense" one — too far apart.
  {
    id: "intensity",
    type: "select",
    label: "How serious are you about this subject?",
    options: ["Casual", "Serious", "Intense"],
  },

];
