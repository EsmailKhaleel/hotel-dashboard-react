import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { FiChevronDown } from 'react-icons/fi';
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grey-300, #d1d5db);
  border-radius: var(--border-radius-sm, 4px);
  background-color: var(--color-grey-0, #ffffff);
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
  transform: none;
  
  &:focus {
    outline: none;
    border-color: var(--color-brand-600, #2563eb);
  }

  &:disabled {
    background-color: var(--color-grey-200, #e5e7eb);
    cursor: not-allowed;
  }

  &[aria-invalid="true"] {
    border-color: var(--color-red-700, #dc2626);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-grey-0, #ffffff);
  border: 1px solid var(--color-grey-300, #d1d5db);
  border-radius: var(--border-radius-sm, 4px);
  margin-top: 0.4rem;
  max-height: 300px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled(Input)`
  margin: 1.2rem;
  width: calc(100% - 2.4rem);
`;

const DropdownOptions = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownOption = styled.button`
  width: 100%;
  padding: 1.2rem 1.6rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-grey-100, #f3f4f6);
  
  &:hover {
    background-color: var(--color-grey-50, #f9fafb);
  }

  &.selected {
    background-color: var(--color-brand-100, #dbeafe);
    color: var(--color-brand-700, #1d4ed8);
  }
`;

const OptionDetails = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-500, #6b7280);
  margin-top: 0.4rem;
`;
export default function SearchDropdown({ options, value, onChange, placeholder, searchKey, displayKey, error, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options?.filter(option =>
        option[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options?.find(option => option._id === value);

    return (
        <DropdownContainer>
            <DropdownButton
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                aria-invalid={error ? 'true' : 'false'}
            >
                <span style={{ color: selectedOption ? 'inherit' : 'var(--color-grey-400, #9ca3af)' }}>
                    {selectedOption ? selectedOption[displayKey] : placeholder}
                </span>
                <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </DropdownButton>

            {isOpen && (
                <DropdownMenu>
                    <SearchInput
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <DropdownOptions>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <DropdownOption
                                    key={option._id}
                                    type="button"
                                    onClick={() => {
                                        onChange(option._id);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={value === option._id ? 'selected' : ''}
                                >
                                    {option[displayKey]}
                                    {option.email && (
                                        <OptionDetails>{option.email}</OptionDetails>
                                    )}
                                    {option.maxCapacity && (
                                        <OptionDetails>
                                            Max {option.maxCapacity} guests • ${option.regularPrice - (option.discount || 0)}/night
                                        </OptionDetails>
                                    )}
                                </DropdownOption>
                            ))
                        ) : (
                            <div style={{ padding: '1.2rem 1.6rem', color: 'var(--color-grey-500, #6b7280)', textAlign: 'center' }}>
                                No options found
                            </div>
                        )}
                    </DropdownOptions>
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
}