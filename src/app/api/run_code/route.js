export async function POST(req) {
  try {
    const { script, stdin, language, compileOnly } = await req.json();

    const clientId = process.env.NEXT_PUBLIC_JdoodleClientID;
    const clientSecret = process.env.NEXT_PUBLIC_JdoodleClientSecret;
 
    const payload = {
      clientId: clientId,
      clientSecret: clientSecret,
      script: script,
      stdin: stdin,
      language: language,
      compileOnly: compileOnly
    };

    const jdoodleRes = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await jdoodleRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Execution failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
