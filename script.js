const dialog = document.querySelector('.intern-dialog');
const linkList = document.querySelector('#intern-links');
for (const link of interneLinks) {
  try {
    const url = new URL(link.url);
    if (!['http:', 'https:'].includes(url.protocol)) continue;
    const anchor = document.createElement('a');
    anchor.href = url.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = link.name;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    anchor.append(arrow);
    linkList.append(anchor);
  } catch {
    // Ungültige Adressen werden nicht angezeigt.
  }
}
if (!linkList.children.length) linkList.textContent = 'Hier werden später Links ergänzt.';
document.querySelectorAll('[data-open-intern]').forEach(button => {
  button.addEventListener('click', () => dialog.showModal());
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const peopleList = document.querySelector('#personen-liste');
const personDialog = document.querySelector('.person-dialog');
function personPhoto(container, person) {
  container.replaceChildren();
  if (person.bild) {
    const img = document.createElement('img');
    img.src = person.bild;
    img.alt = '';
    img.addEventListener('error', () => { img.remove(); container.textContent = '✳'; });
    container.append(img);
  } else container.textContent = '✳';
}
function contactValue(id, value, prefix) {
  const container = document.getElementById(id);
  container.replaceChildren();
  if (!value) { container.textContent = 'Wird ergänzt'; return; }
  const link = document.createElement('a');
  link.textContent = value;
  link.href = prefix + value;
  container.append(link);
}
for (const person of kontaktpersonen) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'person-row';
  const photo = document.createElement('span');
  photo.className = 'person-photo';
  photo.setAttribute('aria-hidden', 'true');
  personPhoto(photo, person);
  const text = document.createElement('span');
  text.className = 'person-row-text';
  const name = document.createElement('strong');
  name.textContent = person.name;
  const position = document.createElement('span');
  position.textContent = person.position;
  text.append(name, position);
  const arrow = document.createElement('span');
  arrow.className = 'person-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  button.append(photo, text, arrow);
  button.addEventListener('click', () => {
    document.querySelector('#person-name').textContent = person.name;
    document.querySelector('#person-position').textContent = person.position;
    personPhoto(document.querySelector('#person-bild'), person);
    contactValue('person-telefon', person.telefon, 'tel:');
    contactValue('person-email', person.email, 'mailto:');
    personDialog.showModal();
  });
  peopleList.append(button);
}
document.querySelector('.person-close').addEventListener('click', () => personDialog.close());
personDialog.addEventListener('click', event => { if (event.target === personDialog) personDialog.close(); });
