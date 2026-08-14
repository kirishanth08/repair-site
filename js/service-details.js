/* ==========================================================================
   VOLTIX — Dynamic Service Details
   Reads ?service=<slug> from the URL and fills service-details.html with the
   matching service content. Falls back to "screen-replacement" when missing.
   ========================================================================== */

(function () {
  'use strict';

  var SERVICES = {
    'screen-replacement': {
      name: 'Screen Replacement',
      eyebrow: 'Screen replacement',
      img: 'assets/img/sd-screen.jpg',
      imgAlt: 'A technician replacing a cracked smartphone screen',
      introH: 'Cracked screens, replaced like new',
      intro1: 'A cracked, unresponsive or unreadable screen is the most common repair we see — and one of the fastest to fix. We replace the glass, LCD or OLED display with genuine-grade parts that match the original look, touch response and colour.',
      intro2: 'Every screen repair includes a full function test, a free calibration and our 6-month workmanship warranty. Most phones are returned the same day.',
      included: [
        ['fa-solid fa-mobile-screen', 'Genuine-grade display'],
        ['fa-solid fa-hand-pointer', 'Original touch sensitivity'],
        ['fa-solid fa-paintbrush', 'True-to-life colour calibration'],
        ['fa-solid fa-bolt', 'Under 45 minutes'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-vial', 'Full function test']
      ],
      steps: [
        ['Free diagnosis', 'we inspect the device and confirm the exact damage and quote.'],
        ['Part order (if needed)', 'genuine-grade glass or OLED arrives within 1–2 days.'],
        ['Safe disassembly', 'your device is opened in our anti-static clean bench.'],
        ['Panel swap', 'the new display is installed and seated with new adhesive.'],
        ['Calibration &amp; test', 'touch, brightness, sensors and True-Tone verified.'],
        ['Handover &amp; warranty', 'backed by a 6-month warranty and a 25-point check.']
      ],
      pricing: [
        ['Smartphones (most models)', '$89'],
        ['iPhone / high-end OLED', 'from $129'],
        ['Tablets', 'from $109'],
        ['Laptops (panel)', 'from $149'],
        ['Foldable displays', 'from $249']
      ],
      know: [
        ['fa-solid fa-clock', '30–90 minutes'],
        ['fa-solid fa-battery-full', 'Battery usually untouched'],
        ['fa-solid fa-mobile-screen', 'Genuine-grade parts only'],
        ['fa-solid fa-shield-halved', '6-month warranty included']
      ],
      faq: [
        ['Can you fix my phone if the screen is black but the phone works?', 'Almost certainly. A black screen is often just a broken display or loose flex cable — not a dead phone. We diagnose free and usually restore it the same day.'],
        ['Will the replacement screen look exactly like the original?', 'Yes. We use genuine-grade panels matched to your model, including OLED on OLED phones, so colours, brightness and touch feel identical to stock.'],
        ['Do you guarantee the repair?', 'Every screen replacement includes a 6-month warranty on parts and labour. If the panel fails through normal use, we replace it free.']
      ],
      related: ['battery-replacement', 'water-damage', 'motherboard-repair']
    },

    'battery-replacement': {
      name: 'Battery Replacement',
      eyebrow: 'Battery replacement',
      img: 'assets/img/sd-battery.jpg',
      imgAlt: 'A technician swapping a swollen phone battery',
      introH: 'Your battery, restored to 100% health',
      intro1: 'Fast-draining, shutting down above 20%, or swelling — a tired battery makes any device unusable. We replace batteries with high-quality cells matched to your exact model, then recalibrate so you get full runtime again.',
      intro2: 'A new battery typically restores 90–100% of the original capacity. We also check the charging port and firmware as part of every battery service.',
      included: [
        ['fa-solid fa-battery-full', 'High-capacity cell'],
        ['fa-solid fa-gauge-high', 'Health calibration'],
        ['fa-solid fa-charging-station', 'Charging port check'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-truck-fast', 'Most done same day'],
        ['fa-solid fa-recycle', 'Safe battery recycling']
      ],
      steps: [
        ['Battery health test', 'we measure capacity, cycle count and health in a few minutes.'],
        ['Quote &amp; approval', 'you approve the price before we open the device.'],
        ['Safe removal', 'the old cell is removed with proper discharge and handling.'],
        ['New cell install', 'the replacement is fitted and sealed correctly.'],
        ['Calibration cycle', 'full charge/discharge to maximise lifespan.'],
        ['Test &amp; handover', 'runtime test, health report and warranty card.']
      ],
      pricing: [
        ['Smartphones', 'from $59'],
        ['iPhone batteries', 'from $69'],
        ['Laptops (internal)', 'from $99'],
        ['Tablets', 'from $79'],
        ['Smartwatches', 'from $49']
      ],
      know: [
        ['fa-solid fa-clock', '20–60 minutes'],
        ['fa-solid fa-battery-full', 'Restores 90–100% capacity'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-recycle', 'Old battery recycled safely']
      ],
      faq: [
        ['Why does my phone keep shutting down at 30%?', 'The battery is degraded or the voltage sag is too steep for the firmware. A replacement cell fixes both symptoms.'],
        ['Will a new battery make my phone as fast as new?', 'In most cases yes — especially on iOS devices where performance is throttled to protect a degraded battery.'],
        ['Is it safe to use my phone while it is charging?', 'Yes, with a quality cell and a certified charger. We always recommend the original or a certified charger.']
      ],
      related: ['screen-replacement', 'charging-port', 'water-damage']
    },

    'charging-port': {
      name: 'Charging Port Repair',
      eyebrow: 'Charging port repair',
      img: 'assets/img/sd-port.jpg',
      imgAlt: 'Cleaning and resoldering a charging port',
      introH: 'Charging headaches, solved',
      intro1: 'Loose, dirty or damaged charging ports cause endless frustration — intermittent charging, slow charge, or no connection at all. We clean, repair or fully replace the port so your device charges first time, every time.',
      intro2: 'We also test your cable and charger for free, so you never pay for a port when a $10 cable was the real culprit.',
      included: [
        ['fa-solid fa-plug', 'Port cleaning &amp; re-seating'],
        ['fa-solid fa-bolt', 'Full port replacement'],
        ['fa-solid fa-microchip', 'Micro-soldering (on request)'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-hourglass-half', 'Often under 1 hour'],
        ['fa-solid fa-circle-check', 'Cable &amp; charger test included']
      ],
      steps: [
        ['Connection test', 'we confirm whether the issue is the cable, port or battery.'],
        ['Microscope inspection', 'the port is examined for debris, bent pins or damage.'],
        ['Deep clean', 'lint and corrosion are removed with specialist tools.'],
        ['Replacement (if needed)', 'a new port is soldered and aligned.'],
        ['Load test', 'charge speed and data transfer are verified.'],
        ['Handover', 'with tips to keep the port clean and protected.']
      ],
      pricing: [
        ['Port cleaning only', '$19'],
        ['Smartphone port replacement', 'from $69'],
        ['Tablet port replacement', 'from $89'],
        ['Laptop port replacement', 'from $99']
      ],
      know: [
        ['fa-solid fa-clock', '30–90 minutes'],
        ['fa-solid fa-plug', 'USB-C, Lightning &amp; micro-USB'],
        ['fa-solid fa-bolt', 'Fast-charge verified'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      faq: [
        ['Do I need a port replacement or just a clean?', 'In about half of cases a professional clean fixes the issue for $19. We diagnose first and never recommend a replacement unless it is genuinely needed.'],
        ['Why is my phone charging only in certain positions?', 'That usually means a loose connector or worn pins inside the port. We will inspect under a microscope and re-seat or replace as needed.'],
        ['Can wireless charging fix my broken port?', 'Wireless charging can keep you going temporarily, but data sync and fast charging still need a working port.']
      ],
      related: ['battery-replacement', 'screen-replacement', 'motherboard-repair']
    },

    'motherboard-repair': {
      name: 'Motherboard &amp; Logic Board Repair',
      eyebrow: 'Motherboard repair',
      img: 'assets/img/sd-board.jpg',
      imgAlt: 'Micro-soldering on a logic board under a microscope',
      introH: 'Board-level repair, in-house',
      intro1: 'No power, no display, random freezes or Wi-Fi failure — these are often logic-board faults. Our micro-soldering technicians repair board-level issues in-house: chip reballing, trace repair, jumper work and component replacement.',
      intro2: 'We have the microscopy, rework stations and schematics to fix what most shops would call "unrepairable" — often at a fraction of the cost of a replacement device.',
      included: [
        ['fa-solid fa-microscope', 'Microscope-based inspection'],
        ['fa-solid fa-fire', 'Chip reballing &amp; reflow'],
        ['fa-solid fa-pen', 'Trace repair &amp; jumpers'],
        ['fa-solid fa-microchip', 'IC-level replacement'],
        ['fa-solid fa-temperature-arrow-up', 'Precision rework station'],
        ['fa-solid fa-shield-halved', '30-day board warranty']
      ],
      steps: [
        ['Free diagnostic', 'we bench-test the board and pinpoint the fault zone.'],
        ['Schematic review', 'board schematics are pulled to plan the repair.'],
        ['Micro-soldering', 'the damaged chip or trace is repaired under microscope.'],
        ['Reassembly', 'the device is rebuilt to factory spec.'],
        ['Stress test', 'heat, battery and functionality tests for 24h.'],
        ['Warranty handover', '30-day warranty on board repairs.']
      ],
      pricing: [
        ['Diagnosis (free if repaired)', '$0'],
        ['Simple component swap', 'from $89'],
        ['Chip reball / reflow', 'from $129'],
        ['Complex board repair', 'from $199'],
        ['Data recovery add-on', 'from $99']
      ],
      know: [
        ['fa-solid fa-clock', '1–4 working days'],
        ['fa-solid fa-microscope', 'In-house micro-soldering'],
        ['fa-solid fa-toolbox', 'All brands &amp; models'],
        ['fa-solid fa-shield-halved', '30-day board warranty']
      ],
      faq: [
        ['My device fell in liquid and now won\'t turn on — is it a board issue?', 'Very likely, and time matters. The sooner we do corrosion treatment and board work, the better the chance of full recovery. Do not attempt to charge it.'],
        ['What does "board-level repair" mean?', 'It means fixing the electronics at component level — individual chips, capacitors and traces — instead of replacing the whole logic board. It is far more affordable.'],
        ['How long does a motherboard repair take?', 'Most board repairs take 1–4 working days depending on the fault. We always give you a realistic estimate after diagnosis.']
      ],
      related: ['water-damage', 'screen-replacement', 'battery-replacement']
    },

    'water-damage': {
      name: 'Water &amp; Liquid Damage Repair',
      eyebrow: 'Water damage repair',
      img: 'assets/img/sd-water.jpg',
      imgAlt: 'Corrosion treatment on a liquid-damaged logic board',
      introH: 'Act fast, recover more',
      intro1: 'Dropped in a pool, caught in the rain or drowned in coffee? Immediate professional treatment gives your device the best chance. We open, clean and de-corrode the board, then test every function.',
      intro2: 'The single most important rule: do not charge a wet device and do not try to "dry it with rice". Bring it in and we handle it properly.',
      included: [
        ['fa-solid fa-droplet', 'Full ultrasonic bath'],
        ['fa-solid fa-brush', 'Corrosion treatment'],
        ['fa-solid fa-microscope', 'Board inspection'],
        ['fa-solid fa-tools', 'Component replacement'],
        ['fa-solid fa-clipboard-check', 'Function testing'],
        ['fa-solid fa-shield-halved', '30-day recovery warranty']
      ],
      steps: [
        ['Immediate intake', 'the device is powered off and opened within minutes.'],
        ['Ultrasonic clean', 'board is bathed to lift contaminants.'],
        ['Corrosion removal', 'affected areas are brushed and treated.'],
        ['Component repair', 'damaged parts are replaced at board level.'],
        ['Reassembly &amp; test', 'every function is verified.'],
        ['Recovery update', 'we call you with the outcome and next steps.']
      ],
      pricing: [
        ['Phone clean &amp; de-corrosion', 'from $79'],
        ['Board-level water repair', 'from $129'],
        ['Laptop liquid damage', 'from $149'],
        ['Data recovery (priority)', 'from $99']
      ],
      know: [
        ['fa-solid fa-clock', '1–3 working days'],
        ['fa-solid fa-droplet', 'Ultrasonic + manual clean'],
        ['fa-solid fa-shield-halved', '30-day recovery warranty'],
        ['fa-solid fa-triangle-exclamation', 'Do not charge a wet device']
      ],
      faq: [
        ['I put my phone in rice — is that OK?', 'Rice does more harm than good: it leaves starch in the ports and lets corrosion continue. Bring the device to us as soon as possible.'],
        ['Can you save data from a dead water-damaged phone?', 'Often yes. Data recovery is done at board level; we can usually pull data even when the screen never turns on again.'],
        ['How much does water damage repair cost?', 'From $79 for a clean and de-corrosion, up to $149+ for complex board work. We quote only after inspecting the board.']
      ],
      related: ['motherboard-repair', 'battery-replacement', 'screen-replacement']
    },

    'camera-repair': {
      name: 'Camera &amp; Lens Repair',
      eyebrow: 'Camera repair',
      img: 'assets/img/sd-camera.jpg',
      imgAlt: 'Installing a new camera module',
      introH: 'Blurry shots, fixed',
      intro1: 'A scratched lens, a black screen when the camera opens, or a wobbling camera module — all fixable. We replace camera modules, clean lenses and repair the flex cables that connect them.',
      intro2: 'After repair we run a full camera test: focus, stabilisation, flash, video and front camera, so every sensor works as it should.',
      included: [
        ['fa-solid fa-camera', 'Rear / front camera module'],
        ['fa-solid fa-arrows-spin', 'OIS stabilisation check'],
        ['fa-solid fa-bolt-lightning', 'Flash repair'],
        ['fa-solid fa-wand-magic-sparkles', 'Lens cleaning'],
        ['fa-solid fa-clapperboard', 'Video &amp; zoom test'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      steps: [
        ['Camera diagnosis', 'we identify whether it is glass, module, cable or software.'],
        ['Part sourcing', 'genuine-grade modules for your model.'],
        ['Module install', 'the new camera is fitted and seated.'],
        ['Calibration', 'focus and stabilisation are calibrated.'],
        ['Full test', 'front, rear, flash, video and zoom verified.'],
        ['Handover', 'with the 6-month warranty.']
      ],
      pricing: [
        ['Rear camera (most phones)', 'from $79'],
        ['Front / selfie camera', 'from $59'],
        ['Lens cleaning', '$19'],
        ['Tablet camera', 'from $95']
      ],
      know: [
        ['fa-solid fa-clock', '45–90 minutes'],
        ['fa-solid fa-camera', 'All sensors tested'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-wand-magic-sparkles', 'Free lens clean on check-in']
      ],
      faq: [
        ['Why is my camera blurry or out of focus?', 'Usually a dirty lens, a damaged module, or a loose autofocus actuator. We diagnose which in minutes.'],
        ['Can you fix a scratched camera lens?', 'Yes — for glass scratches we can often polish or replace just the lens cover, which is much cheaper than a new module.'],
        ['Will Face ID still work after a camera repair?', 'We preserve and re-pair the front camera to keep Face ID working on supported devices.'],
        ['Does your pricing cover the front camera too?', 'Each camera is priced separately, but we always bundle a diagnostic so you know exactly what you are paying for.']
      ],
      related: ['screen-replacement', 'software-data', 'motherboard-repair']
    },

    'laptop-repair': {
      name: 'Laptop &amp; Computer Repair',
      eyebrow: 'Laptop repair',
      img: 'assets/img/sd-laptop.jpg',
      imgAlt: 'A laptop opened on the repair bench for maintenance',
      introH: 'Desktops and laptops, brought back to life',
      intro1: 'Slow boot, overheating, dead keyboard, broken hinges or a blank screen — our computer bench handles Windows, Mac and ChromeOS machines, from component swaps to full data-safe repairs.',
      intro2: 'We also offer SSD upgrades, thermal paste renewal and cleaning as part of a "tune-up" that makes older laptops feel new again.',
      included: [
        ['fa-solid fa-computer', 'Hardware diagnostics'],
        ['fa-solid fa-fan', 'Cooling &amp; thermal repair'],
        ['fa-solid fa-hard-drive', 'SSD / HDD upgrades'],
        ['fa-solid fa-keyboard', 'Keyboard &amp; trackpad'],
        ['fa-solid fa-laptop', 'Screen &amp; hinges'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      steps: [
        ['Bench diagnosis', 'hardware and OS diagnostics identify the fault.'],
        ['Quote &amp; approval', 'clear pricing before any work begins.'],
        ['Component repair', 'parts swapped or repaired on the bench.'],
        ['Tune-up', 'thermal paste, dusting and driver updates.'],
        ['Stress test', '24h burn-in test to confirm stability.'],
        ['Handover', 'with warranty and care tips.']
      ],
      pricing: [
        ['Diagnosis', 'from $0 (free with repair)'],
        ['Screen replacement', 'from $149'],
        ['Keyboard replacement', 'from $89'],
        ['SSD upgrade (incl. clone)', 'from $99'],
        ['Fan / thermal repair', 'from $79']
      ],
      know: [
        ['fa-solid fa-clock', '1–3 working days'],
        ['fa-solid fa-windows', 'Windows / Mac / ChromeOS'],
        ['fa-solid fa-hard-drive', 'Data-safe repairs'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      faq: [
        ['My laptop is very slow — can you speed it up?', 'In most cases yes: an SSD upgrade, more RAM and a thermal clean give the biggest gains. We will show you benchmarks before and after.'],
        ['Can you recover my files without fixing the whole laptop?', 'Absolutely. We can remove the drive and pull your data onto another machine, or fix just enough to get you booted for a backup.'],
        ['Is a Mac repair more expensive?', 'Parts can cost more, but our labour rates are the same. We always quote clearly before starting.']
      ],
      related: ['motherboard-repair', 'screen-replacement', 'battery-replacement']
    },

    'gaming-repair': {
      name: 'Gaming Console &amp; GPU Repair',
      eyebrow: 'Gaming repair',
      img: 'assets/img/sd-console.jpg',
      imgAlt: 'Repairing the motherboard of a gaming console',
      introH: 'Keep the session going',
      intro1: 'Red ring, blue light of death, disc drive jams, HDMI ports, GPU fans and overheating consoles — we repair PlayStation, Xbox, Nintendo Switch and gaming PCs, including graphics card service.',
      intro2: 'Board-level repair on consoles and GPUs is our speciality: reballing, chip replacement and reflow are all done in-house with professional rework stations.',
      included: [
        ['fa-solid fa-gamepad', 'Console &amp; handheld repair'],
        ['fa-solid fa-fan', 'Thermal paste &amp; fan service'],
        ['fa-solid fa-display', 'HDMI port replacement'],
        ['fa-solid fa-fire', 'GPU reball / reflow'],
        ['fa-solid fa-optical-disk', 'Disc drive repair'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      steps: [
        ['Console triage', 'we bench-test and identify the fault code.'],
        ['Quote &amp; approval', 'clear pricing for parts and labour.'],
        ['Board-level work', 'reball, reflow or component replacement.'],
        ['Assembly &amp; paste', 'fresh thermal paste and clean fans.'],
        ['Burn-in test', 'hours of stress testing across games.'],
        ['Handover', 'warranty and play-ready.']
      ],
      pricing: [
        ['Console clean &amp; thermal', 'from $59'],
        ['HDMI port replacement', 'from $79'],
        ['GPU reball / reflow', 'from $129'],
        ['Disc drive repair', 'from $89'],
        ['Joy-Con drift fix', 'from $39']
      ],
      know: [
        ['fa-solid fa-clock', '1–4 working days'],
        ['fa-solid fa-gamepad', 'PS / Xbox / Switch / PC'],
        ['fa-solid fa-fire', 'In-house reballing'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      faq: [
        ['My console overheats and shuts down — is it fixable?', 'Usually yes. It is almost always dried thermal paste and dust. A clean and re-paste fixes most overheating consoles.'],
        ['What is the red light / blue light of death?', 'A hardware fault on the board, often the APU solder joints or a dead component. Our reball service is exactly for this.'],
        ['Can you fix stick drift on a controller?', 'Yes — we replace the potentiometer or the whole joystick module, which usually fixes drift permanently.']
      ],
      related: ['motherboard-repair', 'screen-replacement', 'laptop-repair']
    },

    'software-data': {
      name: 'Software &amp; Data Recovery',
      eyebrow: 'Software &amp; data recovery',
      img: 'assets/img/sd-data.jpg',
      imgAlt: 'Recovering data from a failed storage drive',
      introH: 'Lost data, found',
      intro1: 'Deleted photos, failed OS updates, virus locks or a device that will not boot — our software bench recovers data and restores your device to a clean, working state.',
      intro2: 'For physically failed drives we work at board level to extract data in our clean environment. Diagnosis is free and we never charge if data cannot be recovered.',
      included: [
        ['fa-solid fa-database', 'File recovery'],
        ['fa-solid fa-shield-halved', 'Ransomware cleanup'],
        ['fa-solid fa-window-restore', 'OS install &amp; repair'],
        ['fa-solid fa-hard-drive', 'Drive cloning'],
        ['fa-solid fa-cloud-arrow-up', 'Cloud backup setup'],
        ['fa-solid fa-lock', 'Encrypted-data handling']
      ],
      steps: [
        ['Free evaluation', 'we assess the storage medium and fault.'],
        ['Cloning', 'a working image is made before any recovery.'],
        ['Recovery', 'files are extracted with professional tools.'],
        ['Verification', 'you confirm the recovered files open correctly.'],
        ['Cleanup / reinstall', 'OS restored or malware removed.'],
        ['Backup plan', 'we set up a backup so it never happens again.']
      ],
      pricing: [
        ['Software tune-up / OS reinstall', 'from $59'],
        ['Virus &amp; malware removal', 'from $79'],
        ['Basic data recovery', 'from $99'],
        ['Advanced (board-level) recovery', 'from $199'],
        ['Priority rush (24h)', '+$60']
      ],
      know: [
        ['fa-solid fa-clock', '1–5 working days'],
        ['fa-solid fa-database', 'HDD, SSD, phone &amp; SD'],
        ['fa-solid fa-circle-check', 'No recovery, no fee'],
        ['fa-solid fa-lock', 'Private &amp; confidential']
      ],
      faq: [
        ['I deleted important files by accident. Can they be recovered?', 'Usually yes, if the device has not been heavily used since. Stop using the device and bring it in — the sooner the better.'],
        ['What if my hard drive is physically damaged?', 'We handle physically failed drives too, working at board level in-house. Not every drive is recoverable, but we try hard before advising against it.'],
        ['Do you charge if you cannot recover the data?', 'No. If data cannot be recovered, you pay nothing — the evaluation is free.']
      ],
      related: ['motherboard-repair', 'laptop-repair', 'camera-repair']
    },

    'home-electronics': {
      name: 'Home Electronics Repair',
      eyebrow: 'Home electronics',
      img: 'assets/img/sd-home.jpg',
      imgAlt: 'Repairing a smart TV control board',
      introH: 'From TVs to smart speakers',
      intro1: 'Televisions, monitors, smart speakers, microwaves, soundbars and more — we repair home electronics that most shops refuse, replacing power supplies, main boards, panels and speakers.',
      intro2: 'Backed by a 6-month warranty and honest advice. If a repair costs more than a sensible replacement, we will tell you — and usually still fix it cheaper.',
      included: [
        ['fa-solid fa-tv', 'TV &amp; monitor repair'],
        ['fa-solid fa-volume-high', 'Soundbar &amp; speaker repair'],
        ['fa-solid fa-plug', 'Power supply replacement'],
        ['fa-solid fa-microchip', 'Main board replacement'],
        ['fa-solid fa-wifi', 'Connectivity faults'],
        ['fa-solid fa-shield-halved', '6-month warranty']
      ],
      steps: [
        ['Symptom check', 'we test the unit and trace the fault.'],
        ['Power &amp; board test', 'PSU, main board and panel checked.'],
        ['Quote &amp; approval', 'you approve before any parts are ordered.'],
        ['Repair', 'components or boards replaced and bench-tested.'],
        ['24h burn-in', 'the unit is left running to prove stability.'],
        ['Delivery &amp; warranty', 'warranty card included.']
      ],
      pricing: [
        ['Power supply (TV/monitor)', 'from $99'],
        ['TV main board', 'from $129'],
        ['Speaker / soundbar repair', 'from $79'],
        ['Backlight / LED strip', 'from $119'],
        ['Diagnosis', '$0 with repair']
      ],
      know: [
        ['fa-solid fa-clock', '2–7 working days'],
        ['fa-solid fa-tv', 'TVs, monitors &amp; audio'],
        ['fa-solid fa-shield-halved', '6-month warranty'],
        ['fa-solid fa-house', 'Pickup &amp; drop-off available']
      ],
      faq: [
        ['Is it worth repairing a TV that is 5 years old?', 'Usually yes — panel and power repairs on a mid-range TV cost a fraction of a new set. We give you a clear comparison before you commit.'],
        ['Why does my TV turn off after a few minutes?', 'That is typically a failing power supply or overheating component. We diagnose the exact cause in our test bay.'],
        ['Can you repair a soundbar?', 'Yes — power, board, speaker and wireless faults are all within scope.']
      ],
      related: ['motherboard-repair', 'gaming-repair', 'screen-replacement']
    }
  };

  function getParam(name) {
    var m = window.location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  var slug = getParam('service');
  var svc = SERVICES[slug] || SERVICES['screen-replacement'];

  function fill() {
    var title = svc.name;
    document.title = title + ' — Service Details | Voltix';
    var mdesc = document.querySelector('meta[name="description"]');
    if (mdesc) mdesc.setAttribute('content', svc.intro1.replace(/<[^>]+>/g, ''));

    var h1 = document.getElementById('sd-title');
    if (h1) h1.innerHTML = title;
    var crumb = document.getElementById('sd-crumb');
    if (crumb) crumb.textContent = title;

    var img = document.getElementById('sd-img');
    if (img) { img.src = svc.img; img.alt = svc.imgAlt; }

    var ih = document.getElementById('sd-intro-h');
    if (ih) ih.innerHTML = svc.introH;
    var i1 = document.getElementById('sd-intro-1');
    if (i1) i1.innerHTML = svc.intro1;
    var i2 = document.getElementById('sd-intro-2');
    if (i2) i2.innerHTML = svc.intro2;

    var inc = document.getElementById('sd-included');
    if (inc) {
      inc.innerHTML = svc.included.map(function (it) {
        return '<div class="col-sm-6"><div class="neu-flat p-3 h-100"><i class="' + it[0] + ' me-2" style="color:var(--accent)"></i>' + it[1] + '</div></div>';
      }).join('');
    }

    var steps = document.getElementById('sd-steps');
    if (steps) {
      steps.innerHTML = svc.steps.map(function (s, i) {
        var last = i === svc.steps.length - 1 ? '' : 'mb-2';
        return '<li class="' + last + '"><b style="color:var(--heading)">' + s[0] + '</b> — ' + s[1] + '</li>';
      }).join('');
    }

    var pricing = document.getElementById('sd-pricing');
    if (pricing) {
      pricing.innerHTML = svc.pricing.map(function (p, i) {
        var last = i === svc.pricing.length - 1 ? '' : 'border-bottom';
        return '<li class="d-flex justify-content-between gap-2 py-1 ' + last + '" style="border-color:var(--bg-soft)!important"><span>' + p[0] + '</span><b style="color:var(--heading)">' + p[1] + '</b></li>';
      }).join('');
    }

    var know = document.getElementById('sd-know');
    if (know) {
      know.innerHTML = svc.know.map(function (k) {
        return '<li class="d-flex align-items-start gap-2 mb-1"><i class="' + k[0] + ' mt-1" style="width:14px;color:var(--accent)"></i><span>' + k[1] + '</span></li>';
      }).join('');
    }

    var faq = document.getElementById('sd-faq-items');
    if (faq) {
      faq.innerHTML = svc.faq.map(function (f, i) {
        var open = i === 0 ? ' show' : '';
        var collapsed = i === 0 ? '' : ' collapsed';
        var exp = i === 0 ? 'true' : 'false';
        return '<div class="accordion-item">' +
          '<h2 class="accordion-header">' +
          '<button class="accordion-button' + collapsed + '" type="button" data-bs-toggle="collapse" data-bs-target="#sdq' + i + '" aria-expanded="' + exp + '">' + f[0] + '</button>' +
          '</h2>' +
          '<div id="sdq' + i + '" class="accordion-collapse collapse' + open + '" data-bs-parent="#faqService">' +
          '<div class="accordion-body">' + f[1] + '</div>' +
          '</div></div>';
      }).join('');
    }

    var faqHead = document.getElementById('sd-faq-head');
    if (faqHead) faqHead.textContent = svc.name + ' questions';

    var related = document.getElementById('sd-related-cards');
    if (related) {
      related.innerHTML = svc.related.map(function (r, i) {
        var rv = SERVICES[r];
        if (!rv) return '';
        var delay = i === 0 ? '' : ' reveal-delay-' + i;
        var icon = rv.included[0] ? rv.included[0][0] : 'fa-solid fa-bolt';
        return '<div class="col-md-4 reveal' + delay + '">' +
          '<div class="card-neu service-card h-100">' +
          '<span class="icon-box"><i class="' + icon + '"></i></span>' +
          '<h3>' + rv.name + '</h3>' +
          '<p>' + rv.intro1.replace(/<[^>]+>/g, '').split('.')[0] + '.</p>' +
          '<a class="card-link" href="service-details.html?service=' + esc(r) + '">View details <i class="fa-solid fa-arrow-right"></i></a>' +
          '</div></div>';
      }).join('');
    }
  }

  fill();
})();
