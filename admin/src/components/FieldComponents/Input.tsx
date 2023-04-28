import React, {useEffect, useState} from 'react';
import {Button, Field, FieldError, FieldHint, FieldInput, FieldLabel, Stack} from '@strapi/design-system';
import {auth, useCMEditViewDataManager, useNotification} from "@strapi/helper-plugin";
import {useIntl} from "react-intl";
import {Magic} from "@strapi/icons";
import {useReadLocalStorage} from "usehooks-ts";
import {SeoInfoType} from "../../../../server/services/open-ai";

// @ts-ignore

interface InputProps {
  value: string;
  name: string;
  attribute: any;
  intlLabel: any;
  labelAction: string;
  required: boolean;
  description: any;
  error: string;
  onChange: Function;
}

const Input = ({
                 value,
                 name,
                 onChange,
                 error,
                 description,
                 required,
                 labelAction,
                 intlLabel,
                 attribute,
               }: InputProps) => {
  const {formatMessage} = useIntl();

  const toggleNotification = useNotification();

  const {modifiedData, allLayoutData} = useCMEditViewDataManager();

  const [seoInformation, setSeoInformation] = useState(value);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateButtonText = isGenerating ? 'Generating...' : 'Generate';

  const contextFieldKey: string | null = useReadLocalStorage(`selected-seo-ai-field-${allLayoutData.contentType.uid}`);

  const seoInfoType: SeoInfoType = attribute.options['seo-info-type'] || SeoInfoType.description;

  useEffect(() => {
    console.log('Set warning if content is edited, so user can generate new metadescription', modifiedData);
  }, [modifiedData]);

  const handleChange = (value: string) => {
    setSeoInformation(value);
    onChange({target: {name, value: seoInformation, type: attribute.type}});
  };

  const handleGenerateClick = async () => {
    if (!contextFieldKey || !modifiedData[contextFieldKey]) {
      toggleNotification({
        type: 'warning',
        title: {
          id: 'open-ai-seo-completion.errors.no-context-field.title',
          defaultMessage: 'No content to generate SEO information from',
        },
        message: {
          id: 'open-ai-seo-completion.errors.no-context-field.description',
          defaultMessage: 'There is no content field selected, so no SEO information can be generated. Make sure there is a minimum of one \'rich text\' field selected in the field picker on the right side of this page.',
        }
      });
      return;
    }

    setIsGenerating(true);
    const response = await fetch(`/open-ai-seo-completion/generate-seo-information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify({
        'content': modifiedData[contextFieldKey],
        'locale': modifiedData.locale,
        'type': seoInfoType
      })
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    const parsedResult = result.choices[0].text.replace(/(?:\r\n|\r|\n)/g, '');

    setSeoInformation(parsedResult);
    setIsGenerating(false);

    onChange({target: {name, value: parsedResult, type: attribute.type}});
  };

  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)}>
      <Stack spacing={2}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>

        <FieldInput
          id={`seo-ai-${seoInfoType}-input}`}
          value={seoInformation}
          required={required}
          minLength={50}
          maxLength={160}
          disabled={isGenerating}
          onChange={(e: any) => handleChange(e.target.value)}
        />
        <FieldHint/>
        <FieldError/>

        <Stack horizontal spacing={2}>
          <Button startIcon={<Magic/>} onClick={handleGenerateClick} variant="secondary">
            {generateButtonText}
          </Button>
        </Stack>

        <FieldHint/>
        <FieldError/>
      </Stack>
    </Field>
  );
}

export default Input;
