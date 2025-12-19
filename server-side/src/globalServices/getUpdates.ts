export default function getUpdates(unsanitizedUpdates: object) {
  const updates = {};
  Object.entries(unsanitizedUpdates).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  return updates;
}
