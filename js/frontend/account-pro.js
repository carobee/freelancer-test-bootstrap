/* global displayFormField */

var AccountProToggleFields;


AccountProToggleFields =  function () {

  //
  // Setup variables and retrieve current values
  //
  var
    $form = $('#account-pro'),

    $taxStatus     = $('#account-pro-tax-status'),
    taxStatusValue = $taxStatus.find('option:selected').val(),

    $freelanceTaxSystem       = $('#account-pro-freelance-tax-system'),
    freelanceTaxSystemValue   = $freelanceTaxSystem.find('option:selected').val(),
    $freelanceTaxSystemParent = $freelanceTaxSystem.parent('li'),

    $companyTaxSystem       = $('#account-pro-company-tax-system'),
    companyTaxSystemValue   = $companyTaxSystem.find('option:selected').val(),
    $companyTaxSystemParent = $companyTaxSystem.parent('li'),

    $companyName       = $('#account-pro-company-name'),
    $companyNameParent = $companyName.parent('li'),

    $companyAddress       = $('#account-pro-company-address'),
    companyAddressValue   = $companyAddress.is(":checked"),
    $companyAddressParent = $companyAddress.parents('li'),

    $companyHeadquarters = $('#account-pro-company-headquarters').removeClass('hidden').hide(),

    $companyCapital       = $('#account-pro-company-capital'),
    $companyCapitalParent = $companyCapital.parent('li'),

    $companyRcs       = $('#account-pro-company-rcs'),
    $companyRcsParent = $companyRcs.parent('li'),

    $isAgaParent = $('#account-pro-aga'),

    $isVat       = $('#account-pro-is-vat'),
    isVatValue   = $isVat.is(":checked"),
    $isVatParent = $('#account-pro-vat'),

    $vatNumber       = $('#account-pro-vat-number'),
    $vatNumberParent = $vatNumber.parent('li'),

    $vatStatement       = $('#account-pro-vat-statement'),
    $vatStatementParent = $vatStatement.parent('li'),

    $contributionsOrganism       = $('#account-pro-contributions-organism'),
    contributionsOrganismValue   = $contributionsOrganism.find('option:selected').val(),
    $contributionsOrganismParent = $contributionsOrganism.parents('li'),

    $contributionsOrganismIdUrssaf       = $('#account-pro-contributions-organism-id-urssaf'),
    $contributionsOrganismIdUrssafParent = $contributionsOrganismIdUrssaf.parent('li'),

    $contributionsArtists = $('#account-pro-contributions-artists')
  ;

  var init = function() {
    handle();

    // Setup form elements
    var transition = 'none';
    hasCompanyAddress(transition);
    isVat(transition);
    taxStatus(transition);
    isMicro(transition);
    isArtist(transition);

    revealForm($form);
    
  }

  var handle = function() {
    //
    // Bind actions on change
    //

    $taxStatus.on('change', function() {
      taxStatusValue = $taxStatus.find("option:selected").val();
      // console.log(taxStatusValue);
      taxStatus();
    });

    $freelanceTaxSystem.on('change', function() {
      freelanceTaxSystemValue = $freelanceTaxSystem.find("option:selected").val();
      // console.log(taxSystemValue);
      taxStatus();
    });

    $companyTaxSystem.on('change', function() {
      companyTaxSystemValue = $companyTaxSystem.find("option:selected").val();
      // console.log(taxSystemValue);
      taxStatus();
    });


    $companyAddress.on('change', function() {
      companyAddressValue = $companyAddress.is(":checked");
      // console.log(companyAddressValue);
      hasCompanyAddress();
    });

    $isVat.on('change', function() {
      isVatValue = $isVat.is(":checked");
      // console.log(isVatValue);
      isVat();
    });

    $contributionsOrganism.on('change', function() {
      contributionsOrganismValue = $contributionsOrganism.find('option:selected').val();
      isArtist();
    });
  }


  // $isContributionsArtistsWithholding.on('change', function() {
  //   isContributionsArtistsWithholdingValue = $contributionsArtistsWithholding.is(":checked");
  //   // console.log(isContributionsArtistsWithholdingValue);
  //   isContributionsArtistsWithholding();
  // });

  //
  // Show/hide elements
  //

  var hasCompanyAddress = function (transition) {
    transition = transition || 'slow';

    if (companyAddressValue) {
      displayFormField($companyHeadquarters, 'show', transition);
    } else {
      displayFormField($companyHeadquarters, 'hide', transition);
    }
  }

  var isVat = function (transition) {
    transition = transition || 'slow';

    if (isVatValue) {
      displayFormField($vatNumberParent, 'hide', transition);
      displayFormField($vatStatementParent, 'hide', transition);
    } else {
      displayFormField($vatNumberParent, 'show', transition);
      displayFormField($vatStatementParent, 'show', transition);
    }
  }

  var isIr = function (transition) {
    transition = transition || 'slow';

    if (companyTaxSystemValue === 'IR') {
      displayFormField($isAgaParent, 'show', transition);
    } else {
      displayFormField($isAgaParent, 'hide', transition);
    }
  }

  var isMicro = function (transition) {
    transition = transition || 'slow';

    if (freelanceTaxSystemValue === 'bnc-special' || freelanceTaxSystemValue === 'bic-micro') {
      displayFormField($isVatParent, 'hide', transition);
    } else {
      displayFormField($isVatParent, 'show', transition);
    }
  }

  var isArtist = function (transition) {
    transition = transition || 'slow';

    if (contributionsOrganismValue === 'URSSAF') {
      displayFormField($contributionsArtists, 'hide', transition);
      displayFormField($contributionsOrganismIdUrssafParent, 'show', transition);
    } else {
      displayFormField($contributionsArtists, 'show', transition);
      displayFormField($contributionsOrganismIdUrssafParent, 'hide', transition);
    }
  }

  var taxStatus = function (transition) {
    transition = transition || 'slow';

    switch(taxStatusValue) {

      case 'AE':
        displayFormField($freelanceTaxSystemParent, 'hide', transition);
        displayFormField($companyTaxSystemParent, 'hide', transition);
        displayFormField($companyNameParent, 'hide', transition);
        displayFormField($companyAddressParent, 'hide', transition);
        displayFormField($companyCapitalParent, 'hide', transition);
        displayFormField($companyRcsParent, 'hide', transition);
        displayFormField($isAgaParent, 'show', transition);
        displayFormField($isVatParent, 'hide', transition);
        displayFormField($contributionsOrganismParent, 'show', transition);
        isArtist(transition);
        break;

      case 'AERL':
        displayFormField($freelanceTaxSystemParent, 'hide', transition);
        displayFormField($companyTaxSystemParent, 'hide', transition);
        displayFormField($companyNameParent, 'hide', transition);
        displayFormField($companyAddressParent, 'hide', transition);
        displayFormField($companyCapitalParent, 'show', transition);
        displayFormField($companyRcsParent, 'show', transition);
        displayFormField($isAgaParent, 'show', transition);
        displayFormField($isVatParent, 'hide', transition);
        displayFormField($contributionsOrganismParent, 'show', transition);
        isArtist(transition);
        break;

      case 'EI':
        displayFormField($freelanceTaxSystemParent, 'show', transition);
        displayFormField($companyTaxSystemParent, 'hide', transition);
        displayFormField($companyNameParent, 'hide', transition);
        displayFormField($companyAddressParent, 'hide', transition);
        displayFormField($companyCapitalParent, 'hide', transition);
        displayFormField($companyRcsParent, 'hide', transition);
        displayFormField($isAgaParent, 'show', transition);
        isMicro(transition);
        displayFormField($contributionsOrganismParent, 'show', transition);
        isArtist(transition);
        break;

      case 'EIRL':
        displayFormField($freelanceTaxSystemParent, 'show', transition);
        displayFormField($companyTaxSystemParent, 'hide', transition);
        displayFormField($companyNameParent, 'hide', transition);
        displayFormField($companyAddressParent, 'hide', transition);
        displayFormField($companyCapitalParent, 'show', transition);
        displayFormField($companyRcsParent, 'show', transition);
        displayFormField($isAgaParent, 'show', transition);
        isMicro(transition);
        displayFormField($contributionsOrganismParent, 'show', transition);
        isArtist (transition);
        break;

      case 'EURL':
      case 'SARL':
      case 'SASU':
      case 'SAS':
        displayFormField($freelanceTaxSystemParent, 'hide', transition);
        displayFormField($companyTaxSystemParent, 'show', transition);
        displayFormField($companyNameParent, 'show', transition);
        displayFormField($companyAddressParent, 'show', transition);
        displayFormField($companyCapitalParent, 'show', transition);
        displayFormField($companyRcsParent, 'show', transition);
        isIr(transition);
        displayFormField($isVatParent, 'show', transition);
        displayFormField($contributionsOrganismParent, 'hide', transition);
        displayFormField($contributionsOrganismIdUrssafParent, 'show', transition);
        displayFormField($contributionsArtists, 'hide', transition);
        break;
    }
  }

  // Initial setup
  init()
};

jQuery(document).ready( function onReady() {
  return new AccountProToggleFields();
});