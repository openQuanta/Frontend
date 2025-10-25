export async function fetchPublishInputFields() {
  const response = await fetch("/data/publish-form.json");
  const { researchFields, licenses } = await response.json();
  return { researchFields, licenses };
}
