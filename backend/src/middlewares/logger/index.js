import { v4 as uuid } from "uuid";

export default function logger(req, res, next) {
  const { method, originalUrl, ip } = req;

  const reqId = uuid();
  req.requestId = reqId;
  res.setHeader("X-Request-Id", reqId);

  const startTime = process.hrtime();
  const startDate = new Date().toISOString();
  const message = `[${startDate} 
    ${reqId}] Started ${method} ${originalUrl} for ${ip}`;

  console.log(message);

  res.on("finish", () => {
    const { statusCode } = res;
    const [sec, nanosec] = process.hrtime(startTime);

    const duration = sec;
    const endDate = new Date().toISOString();
    const endMessage = `[${endDate} ${reqId}] Completed ${statusCode} in ${duration} ms`;
    console.log(endMessage);
  });

  next();
}
